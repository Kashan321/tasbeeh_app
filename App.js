import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './app/Navigations/TabNavigation';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { LocationProvider } from './app/Context/LocationContext';
import Home from './app/pages/Home';
import Quran from './app/pages/Quran'
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator();
export default function App() {
  const [hadiths, setHadiths] = useState([]);

  useEffect(() => {
    const initializeApp = async () => {
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected) {
        fetchAndStoreHadiths();
      } else {
        retrieveHadithsFromStorage();
      }
    };

    initializeApp();
  }, []);

  const fetchAndStoreHadiths = async () => {
    try {
      const response = await fetch(
        `https://www.hadithapi.com/public/api/hadiths?apiKey=$2y$10$f3ZK5ZQk5bpVKFxpyi46ivCLic0XAYV8JNEvp0WxPklOJfhjJC`
      );
      const data = await response.json();

      if (data.hadiths?.data) {
        setHadiths(data.hadiths.data); // Update state
        await AsyncStorage.setItem('hadiths', JSON.stringify(data.hadiths.data)); // Save to local storage
        displayRandomHadith(data.hadiths.data); // Show random Hadith
      }
    } catch (error) {
      console.error("Error fetching Hadiths:", error);
      Alert.alert("Error", "Failed to fetch Hadiths. Check your internet connection.");
    }
  };

  const retrieveHadithsFromStorage = async () => {
    try {
      const storedHadiths = await AsyncStorage.getItem('hadiths');
      if (storedHadiths) {
        const parsedHadiths = JSON.parse(storedHadiths);
        setHadiths(parsedHadiths);
        displayRandomHadith(parsedHadiths);
      } else {
        Alert.alert("Offline", "No Hadith data available for offline use.");
      }
    } catch (error) {
      console.error("Error retrieving Hadiths:", error);
      Alert.alert("Error", "Failed to retrieve Hadiths.");
    }
  };

  const displayRandomHadith = (hadiths) => {
    if (hadiths.length > 0) {
      const randomIndex = Math.floor(Math.random() * hadiths.length);
      const randomHadith = hadiths[randomIndex];

      // Extract details from the random Hadith
      const {
        hadithEnglish,
        hadithUrdu,
        bookSlug,
        chapter: { chapterNumber, chapterEnglish, chapterUrdu },
        book: { writerName, bookName },
      } = randomHadith;

      Alert.alert(
        "Today's Hadith | آج کی حدیث",
        `Hadith (English): ${hadithEnglish || "No English translation available"}\n\n` +
        `Hadith (Urdu): ${hadithUrdu || "No Urdu translation available"}\n\n` +
        `Book Name: ${bookName || "Unknown"}\n` +
        `Writer Name: ${writerName || "Unknown"}\n` +
        `Chapter Number: ${chapterNumber || "Unknown"}\n` +
        `Chapter (English): ${chapterEnglish || "Unknown"}\n` +
        `Chapter (Urdu): ${chapterUrdu || "Unknown"}`,
        [{ text: "OK" }]
      );
    }
  };

  return (
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='Tabs' component={TabNavigation} />
          <Stack.Screen name='Quran' component={Quran} />
        </Stack.Navigator>
        {/* <TabNavigation /> */}
        <StatusBar style="auto" />
      </NavigationContainer>
    </LocationProvider>
    // <Home />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
