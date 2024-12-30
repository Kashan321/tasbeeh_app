import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, ActivityIndicator } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { LocationContext } from '../Context/LocationContext';
import { Feather } from '@expo/vector-icons';
import kakbah from '../../assets/images/kabah_needle.png';
import { primary_color } from '../Constants/Colors'
const THEME_COLOR = primary_color; ;

export default function NewPage() {
  const { location, city, error, loading } = useContext(LocationContext);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [magnetometerData, setMagnetometerData] = useState(null);
  const [needleRotation, setNeedleRotation] = useState(new Animated.Value(0));

  // Fetch Qibla direction using API
  const fetchQiblaDirection = async (latitude, longitude) => {
    try {
      const url = `http://api.aladhan.com/v1/qibla/${latitude}/${longitude}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch Qibla direction");
      }
      const data = await response.json();
      if (data && data.data) {
        setQiblaDirection(Math.round(data.data.direction));
      }
    } catch (error) {
      console.error("Error fetching Qibla direction: ", error);
    }
  };

  // Request location and fetch Qibla direction
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }

      if (location) {
        fetchQiblaDirection(location.latitude, location.longitude);
      }
    })();
  }, [location]);

  // Subscribe to magnetometer data
  useEffect(() => {
    const subscribe = Magnetometer.addListener((data) => {
      setMagnetometerData(data);
    });

    return () => {
      subscribe && subscribe.remove();
    };
  }, []);

  // Calculate compass heading
  const calculateHeading = (magnetometer) => {
    if (magnetometer) {
      let { x, y } = magnetometer;
      let heading = Math.atan2(y, x) * (180 / Math.PI);
      if (heading < 0) {
        heading += 360; // Ensure the heading is within 0-360 degrees
      }
      return heading;
    }
    return 0;
  };

  // Animate compass needle
  useEffect(() => {
    if (magnetometerData) {
      const heading = calculateHeading(magnetometerData);
      const rotation = (360 - heading + 360) % 360;

      Animated.timing(needleRotation, {
        toValue: rotation,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [magnetometerData]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={THEME_COLOR} />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : location ? (
        <>
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={24} color={THEME_COLOR} />
            <Text style={styles.cityText}>{city}</Text>
          </View>
          {qiblaDirection !== null && (
            <View style={styles.qiblaContainer}>
              <Feather name="arrow-up-right" size={24} color={THEME_COLOR} />
              <Text style={styles.qiblaDirectionText}>{qiblaDirection}°</Text>
            </View>
          )}
          <View style={styles.compassContainer}>
            <View style={styles.compassCircle}>
              <View style={styles.compassCenter} />
              {/* <Feather name="arrow-up" size={24} color={THEME_COLOR} style={styles.directionIcon} /> */}
              <Animated.View
                style={[
                  styles.compassNeedle,
                  {
                    transform: [
                      {
                        rotate: needleRotation.interpolate({
                          inputRange: [0, 360],
                          outputRange: ["0deg", "360deg"],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Image source={kakbah} style={styles.needleImage} />
              </Animated.View>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.errorText}>Location not available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cityText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  qiblaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  qiblaDirectionText: {
    fontSize: 24,
    marginLeft: 8,
    color: THEME_COLOR,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'red',
    textAlign: 'center',
  },
  compassContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  compassCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: THEME_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  compassCenter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // backgroundColor: THEME_COLOR,
    position: 'absolute',
    zIndex: 1,
  },
  directionIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
    zIndex: 1,
  },
  compassNeedle: {
    position: 'absolute',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  needleImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});