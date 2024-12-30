import { StyleSheet, Text, View, useWindowDimensions, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../Context/LocationContext';
import Feather from '@expo/vector-icons/Feather';
import { primary_color } from '../Constants/Colors';

const PrayerTimings = () => {
  const { height, width } = useWindowDimensions();
  const { city, error: locationError, loading: locationLoading } = useContext(LocationContext);
  const [prayerData, setPrayerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  const prayerIcons = {
    fajr: "sunrise",
    shurooq: "sun",
    dhuhr: "sun",
    asr: "sun",
    maghrib: "sunset",
    isha: "moon",
  };

  useEffect(() => {
    let isMounted = true;

    if (city) {
      setLoading(true);
      const API_URL = `https://muslimsalat.com/${city}.json`;

      fetch(API_URL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (isMounted) {
            setPrayerData(data);
            setError(null);
            findNextPrayer(data.items[0]);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err.message);
            setPrayerData(null);
          }
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [city]);

  const findNextPrayer = (prayerTimes) => {
    const now = new Date();
    const times = Object.entries(prayerTimes)
      .filter(([key]) => key !== 'date_for')
      .map(([key, value]) => {
        const [hour, minute] = value.split(':').map(Number);
        const time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
        return { name: key, time: time };
      })
      .sort((a, b) => a.time - b.time);

    for (let i = 0; i < times.length; i++) {
      if (times[i].time > now) {
        setNextPrayer(times[i]);
        if (intervalId) {
          clearInterval(intervalId);
        }
        const newIntervalId = updateCountdown(times[i].time);
        setIntervalId(newIntervalId);
        break;
      }
    }
  };

  const updateCountdown = (nextPrayerTime) => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = nextPrayerTime - now;

      if (timeDiff <= 0) {
        clearInterval(interval);
        setCountdown("Time for prayer!");
        return;
      }

      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return interval;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: primary_color,
    },
    header: {
      width: '100%',
      padding: 10,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    prayerContainer: {
      height: height * 0.7,
      width: width * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      marginBottom: 20
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 20,
    },
    cityName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#555',
      marginBottom: 10,
      textAlign: 'center',
    },
    date: {
      fontSize: 16,
      color: '#777',
      marginBottom: 20,
      textAlign: 'center',
    },
    prayerList: {
      width: '100%',
    },
    prayerItem: {
      width: width * 0.8,
      height: height * 0.08,
      backgroundColor: primary_color,
      borderRadius: 20,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    prayerName: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#fff', // Change to white for consistency
      marginLeft: 8,
    },
    prayerTime: {
      fontSize: 16,
      color: '#fff', // Change to white for consistency
      marginRight:25
    },
    noData: {
      textAlign: 'center',
      fontSize: 16,
      color: '#777',
    },
    countdownContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    nextPrayer: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff', // Change to white for consistency
      marginBottom: 10,
    },
    countdown: {
      fontSize: 16,
      color: '#fff', // Change to white for consistency
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Prayer Timings</Text>
      </View>
      <View style={styles.prayerContainer}>
        {locationLoading && <ActivityIndicator size="large" color={primary_color} />}
        {locationError && <Text style={styles.errorText}>Error: {locationError}</Text>}
        {loading && <ActivityIndicator size="large" color={primary_color} />}
        {error && <Text style={styles.errorText}>Error fetching prayer times: {error}</Text>}
        {prayerData && (
          <>
            <Text style={styles.cityName}>City: {city}</Text>
            <Text style={styles.date}>Prayer times for {prayerData.items[0].date_for}</Text>
            <View style={styles.prayerList}>
              {Object.entries(prayerData.items[0])
                .filter(([key]) => key !== 'date_for')
                .map(([key, value]) => (
                  <View style={styles.prayerItem} key={key}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Feather name={prayerIcons[key] || "help-circle"} size={24} color="white" style={{marginLeft:20}} />
                      <Text style={styles.prayerName}>{key.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.prayerTime}>{value}</Text>
                  </View>
                ))}
            </View>
            <View style={styles.countdownContainer}>
              {nextPrayer && (
                <>
                  <Text style={styles.nextPrayer}>Next prayer: {nextPrayer.name}</Text>
                  <Text style={styles.countdown}>Countdown: {countdown}</Text>
                </>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default PrayerTimings;