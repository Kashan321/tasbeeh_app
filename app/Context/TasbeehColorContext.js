import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TasbeehColorContext = createContext();

export const TasbeehColorProvider = ({ children }) => {
  const [tasbeehColor, setTasbeehColor] = useState('#0891b2'); // Default color
  const TASBEEH_COLOR_KEY = "tasbeeh_color";

  // Function to load tasbeeh color from AsyncStorage
  const loadColorFromStorage = async () => {
    try {
      const storedColor = await AsyncStorage.getItem(TASBEEH_COLOR_KEY);
      if (storedColor !== null) {
        setTasbeehColor(storedColor);
      }
    } catch (error) {
      console.error("Error loading color from storage", error);
    }
  };

  useEffect(() => {
    loadColorFromStorage();
  }, []);

  const updateColor = async (color) => {
    try {
      await AsyncStorage.setItem(TASBEEH_COLOR_KEY, color);
      setTasbeehColor(color);
    } catch (error) {
      console.error("Error saving color to storage", error);
    }
  };

  return (
    <TasbeehColorContext.Provider value={{ tasbeehColor, updateColor }}>
      {children}
    </TasbeehColorContext.Provider>
  );
};