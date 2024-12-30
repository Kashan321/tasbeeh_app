import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Dua from '../../assets/Icons/dua_icon.png';
import Kabah from '../../assets/Icons/kabah.png';
import Masjid from '../../assets/Icons/masjid.png';
import Tasbeeh from '../../assets/Icons/tasbeeh.png';
import Quran from '../../assets/Icons/Quran.png';

export default function Home() {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    category: {
      width: width * 0.9,
      height: height * 0.2,
      backgroundColor: '#0891b2',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      marginBottom: 15,
    },
    image: {
      width: 140,
      height: 140,
      resizeMode: 'contain',
      marginLeft: 170,
      marginBottom: 10,
      transform: [{ rotate: '-20deg' }],
    },
    text: {
      fontSize: 35,
      fontWeight: 'bold',
      color: 'white',
      position: 'absolute',
      bottom: 50,
      left: 20,
      zIndex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Quran')}>
          <Image source={Quran} style={[styles.image, { transform: [{ rotateX: '5deg' }], marginTop: 10 }]} />
          <Text style={styles.text}>QURAN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Tasbeeh')}>
          <Image source={Tasbeeh} style={styles.image} />
          <Text style={styles.text}>TASBEEH</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Qibla')}>
          <Image source={Kabah} style={[styles.image, { transform: [{ rotate: '0deg' }] }]} />
          <Text style={styles.text}>QIBLA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Prayers')}>
          <Image source={Masjid} style={[styles.image, { transform: [{ rotateX: '5deg' }], marginTop: 10 }]} />
          <Text style={styles.text}>PRAYERS</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}
