import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { primary_color } from '../Constants/Colors';
import { QuranData } from '../Constants/Quran'; // Import the QuranData

const Quran = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [quranData, setQuranData] = useState([]);
  const [progress, setProgress] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const surahListRef = useRef(null);

  const [fontsLoaded] = useFonts({
    QuranFont: require('../../assets/fonts/Arabic.ttf'), // Ensure this path is correct
  });

  useEffect(() => {
    setQuranData(QuranData.data.surahs); // Use the local JSON data
    getProgress();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      const timeout = setTimeout(() => {
        searchQuran(searchTerm);
      }, 300);
      setDebounceTimeout(timeout);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const saveProgress = async (ayahNumber) => {
    try {
      await AsyncStorage.setItem('@quran_progress', ayahNumber.toString());
      setProgress(ayahNumber);
    } catch (e) {
      console.error('Error saving progress', e);
    }
  };

  const getProgress = async () => {
    try {
      const storedProgress = await AsyncStorage.getItem('@quran_progress');
      if (storedProgress !== null) {
        setProgress(parseInt(storedProgress));
      }
    } catch (e) {
      console.error('Error fetching progress', e);
    }
  };

  const searchQuran = (term) => {
    const results = [];
    quranData.forEach((surah) => {
      if (surah.englishName.toLowerCase().includes(term.toLowerCase())) {
        results.push({ surah: surah, ayah: null });
      }
      surah.ayahs.forEach((ayah) => {
        if (ayah.text && ayah.text.toLowerCase().includes(term.toLowerCase())) {
          results.push({ surah: surah, ayah: ayah });
        }
      });
    });
    setSearchResults(results);
  };

  const getItemLayout = (data, index) => ({
    length: 100, // Assuming each item has a height of 100
    offset: 100 * index,
    index
  });

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      if (surahListRef.current) {
        surahListRef.current.scrollToIndex({ index: info.index, animated: true });
      }
    });
  };

  const scrollToSurah = (surahIndex) => {
    if (surahListRef.current) {
      surahListRef.current.scrollToIndex({ index: surahIndex, animated: true });
    }
  };

  const scrollToAyah = (ayahNumber) => {
    const surahIndex = quranData.findIndex(surah => surah.ayahs.some(ayah => ayah.number === ayahNumber));
    if (surahIndex !== -1) {
      const ayahIndex = quranData[surahIndex].ayahs.findIndex(ayah => ayah.number === ayahNumber);
      scrollToSurah(surahIndex);
      setTimeout(() => {
        surahListRef.current.scrollToIndex({ index: ayahIndex, animated: true });
      }, 500); // Delay to ensure the Surah is visible first
    }
  };

  const handleSearchResultPress = (item) => {
    if (item.ayah) {
      scrollToAyah(item.ayah.number);
    } else {
      const surahIndex = quranData.findIndex(surah => surah.englishName === item.surah.englishName);
      if (surahIndex !== -1) {
        scrollToSurah(surahIndex);
      }
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    header: {
      width: width,
      height: height * 0.1,
      backgroundColor: primary_color,
      justifyContent: 'center',
      position: 'static',
    },
    headerCont: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    backButton: {
      flex: 1,
      alignItems: 'flex-start',
    },
    title: {
      flex: 1,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 30,
      fontWeight: '800',
      color: 'white',
      textAlign: 'center',
    },
    input: {
      margin: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: '#fff',
    },
    surahContainer: {
      marginVertical: 10,
      paddingHorizontal: 20,
    },
    surahName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: primary_color,
      textAlign: 'center',
    },
    ayahText: {
      fontSize: 25,
      color: '#333',
      marginBottom: 10,
      textAlign: 'right',
      fontFamily: 'QuranFont', // Use the loaded font
    },
    ayahList: {
      marginTop: 10,
    },
    suggestion: {
      padding: 10,
      borderBottomWidth: 1,
    },
    divider: {
      height: 1,
      backgroundColor: '#ccc',
      marginVertical: 10,
    },
    lastAyah: {
      textAlign: "center",
      marginBottom: 10,
      fontSize: 20
    }
  });

  const renderAyah = ({ item }) => (
    <TouchableOpacity onPress={() => saveProgress(item.number)}>
      <Text style={styles.ayahText}>
        {item.numberInSurah}) {item.text}
      </Text>
    </TouchableOpacity>
  );

  const renderSurah = ({ item }) => (
    <View style={styles.surahContainer}>
      <Text style={styles.surahName}>{item.name}</Text>
      <FlatList
        data={item.ayahs}
        keyExtractor={(ayah) => ayah.number.toString()}
        renderItem={renderAyah}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
      <View style={styles.divider} />
    </View>
  );

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity onPress={() => handleSearchResultPress(item)}>
      <View style={styles.suggestion}>
        {item.ayah ? (
          <Text style={styles.ayahText}>
            {item.surah.englishName}: {item.ayah.text}
          </Text>
        ) : (
          <Text style={styles.surahName}>{item.surah.englishName}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCont}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Tabs')}>
            <Ionicons name="arrow-back-sharp" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.headerText}>QURAN</Text>
          </View>
          <Text style={{ flex: 1 }}></Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search by Surah name or Ayah text"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSearchResult}
        style={styles.ayahList}
      />

      <FlatList
        ref={surahListRef}
        data={quranData}
        keyExtractor={(item) => item.number.toString()}
        renderItem={renderSurah}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
        style={styles.ayahList}
      />

      {progress && (
        <TouchableOpacity onPress={() => scrollToAyah(progress)}>
          <Text style={styles.lastAyah}>
            Your last read was Ayah number: <Text style={{ color: primary_color, fontWeight: "900" }}>{progress}</Text>
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Quran;