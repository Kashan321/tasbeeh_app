import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import MetallicButton from "../Components/MetalicButton";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TasbeehColorContext } from "../Context/TasbeehColorContext";

const MainScreen = () => {
  const [count, setCount] = useState(0);
  const [setCounter, setSetCounter] = useState(0); 
  const [light, setLight] = useState(false);
  const [fontsLoaded, setFontLoaded] = useState(false);
  const { tasbeehColor } = useContext(TasbeehColorContext);

  const COUNT_KEY = "tasbeeh_count";
  const SET_COUNT_KEY = "tasbeeh_set_count";

  // Function to handle count increment and reset after 100
  const handleCount = () => {
    const newCount = (count + 1) % 101; 
    setCount(newCount);
    if (newCount === 0) {
      const newSetCounter = setCounter + 1;
      setSetCounter(newSetCounter);
      saveSetCountToStorage(newSetCounter);
    }
    saveCountToStorage(newCount);
  };

  // Function to reset count and set counter
  const handleReset = () => {
    setCount(0);
    setSetCounter(0);
    saveCountToStorage(0);
    saveSetCountToStorage(0);
  };

  // Function to load custom fonts
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Digital_7: require("../../assets/fonts/digital-7.ttf"),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  // Function to save count to AsyncStorage
  const saveCountToStorage = async (newCount) => {
    try {
      await AsyncStorage.setItem(COUNT_KEY, newCount.toString());
    } catch (error) {
      console.error("Error saving count to storage", error);
    }
  };

  // Function to save set count to AsyncStorage
  const saveSetCountToStorage = async (newSetCounter) => {
    try {
      await AsyncStorage.setItem(SET_COUNT_KEY, newSetCounter.toString());
    } catch (error) {
      console.error("Error saving set count to storage", error);
    }
  };

  // Function to handle light toggle
  const handleLight = () => {
    setLight(!light);
  };

  // Function to load count and set count from AsyncStorage
  useEffect(() => {
    const loadCountFromStorage = async () => {
      try {
        const storedCount = await AsyncStorage.getItem(COUNT_KEY);
        const storedSetCounter = await AsyncStorage.getItem(SET_COUNT_KEY);
        if (storedCount !== null) {
          setCount(parseInt(storedCount, 10));
        }
        if (storedSetCounter !== null) {
          setSetCounter(parseInt(storedSetCounter, 10));
        }
      } catch (error) {
        console.error("Error loading count from storage", error);
      }
    };
    loadCountFromStorage();
  }, []);

  if (!fontsLoaded) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.body,{ backgroundColor: tasbeehColor }]}>
        <View style={[styles.screen]}>
          <View
            style={[
              styles.countDisplay,
              { backgroundColor: light ? "#56fe0b" : "#97a29a" },
            ]}
          >
            <Text style={styles.countText}>{count.toString().padStart(3, "0")}</Text>
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={styles.mainButton}>
            <MetallicButton size={55} onPress={handleCount} />
          </View>
          <View style={styles.resetButton}>
            <MetallicButton size={30} label={"R"} onPress={handleReset} />
          </View>
          <View style={styles.lightButton}>
            <MetallicButton size={30} label={"L"} onPress={handleLight} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    height: 250,
    width: 250,
    borderRadius: 60,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0891b2",
    elevation: 10, // For Android shadow effect
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: -10 }, // Shadow only on top (negative height)
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  screen: {
    width: "80%",
    height: 100,
    backgroundColor: "#000000",
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 30,
    shadowColor: "#000", // Black shadow color
    shadowOffset: { width: 0, height: -4 }, // Offset to make the shadow appear inside
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 6, // Spread of the shadow
    elevation: 5, // Required for Android to show shadows
  },
  countDisplay: {
    width: "100%",
    borderRadius: 4,
    padding: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center", // Ensure it aligns in the center
    alignItems: "center", // Ensures text is centered inside the countDisplay
  },
  countText: {
    color: "#000000",
    fontSize: 50,
    fontFamily: "Digital_7",
    textAlign: "center",
  },
  // Button styles
  mainButton: {
    position: "absolute",
    top: 50,
  },
  resetButton: {
    position: "absolute",
    top: 10,
    left: 55
  },
  lightButton: {
    position: "absolute",
    top: 10,
    right: 55
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  }
});