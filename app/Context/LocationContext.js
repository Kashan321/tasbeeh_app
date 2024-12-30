import React, { createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // To store user location
  const [city, setCity] = useState(null); // To store city name
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const getLocation = async () => {
      try {
        setLoading(true);
        // Request permission for location access
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          setLoading(false);
          return;
        }

        // Get current location
        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // Reverse geocode to get the city name
        const geoData = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        const userCity = geoData[0]?.city || geoData[0]?.name; // Handle fallback if city is missing
        setCity(userCity);

        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, city, error, loading }}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };