import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import MetallicButton from "../Components/MetalicButton";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = () => {
    const [count, setCount] = useState(0);
    const [setCounter, setSetCounter] = useState(0); // Renamed to avoid conflict
    const [light, setLight] = useState(false);
    const [fontsLoaded, setFontLoaded] = useState(false);

    const COUNT_KEY = "tasbeeh_count";
    const SET_COUNT_KEY = "tasbeeh_set_count";

    const handleCount = () => {
        const newCount = (count + 1) % 101; // Increase count and reset to 0 when it reaches 100
        setCount(newCount);
        if (newCount === 0) {
            const newSetCounter = setCounter + 1;
            setSetCounter(newSetCounter);
            saveSetCountToStorage(newSetCounter);
        }
        saveCountToStorage(newCount);
    };

    const handleReset = () => {
        setCount(0);
        setSetCounter(0);
        saveCountToStorage(0);
        saveSetCountToStorage(0);
    };

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                Digital_7: require("../../assets/fonts/digital-7.ttf"),
            });
            setFontLoaded(true);
        };
        loadFonts();
    }, []);

    const saveCountToStorage = async (newCount) => {
        try {
            await AsyncStorage.setItem(COUNT_KEY, newCount.toString());
        } catch (error) {
            console.error("Error saving count to storage", error);
        }
    };

    const saveSetCountToStorage = async (newSetCounter) => {
        try {
            await AsyncStorage.setItem(SET_COUNT_KEY, newSetCounter.toString());
        } catch (error) {
            console.error("Error saving set count to storage", error);
        }
    };
    const handleLight = () => {
        setLight(!light);
    };

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

    const borderWidth = count === 0 ? 0 : 5;
    const borderColor = count === 0 ? 'transparent' : '#0891b2';

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.body}>
                    <View style={styles.screen}>
                        <View
                            style={[
                                styles.countDisplay,
                                { backgroundColor: light ? "#56fe0b" : "#97a29a" },
                            ]}
                        >
                            <Text style={styles.countText}>{count.toString().padStart(3, "0")}</Text>
                        </View>
                        {/* <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Light</Text>
                    <Text style={styles.labelText}>RESET</Text>
                </View> */}
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <View style={{
                            position: "absolute",
                            top: 50,
                        }}>
                            <MetallicButton size={55} onPress={handleCount} />
                        </View>
                        <View style={{
                            position: "absolute",
                            top: 10,
                            left: 55
                        }}>
                            <MetallicButton size={30} label={"R"} onPress={handleReset} />
                        </View>
                        <View style={{
                            position: "absolute",
                            top: 10,
                            right: 55
                        }}>
                            <MetallicButton size={30} label={"L"} onPress={handleLight} />
                        </View>
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
    // body: {
    //     height: 220,
    //     width: 220,
    //     borderRadius: 60,
    //     borderBottomLeftRadius: 300,
    //     borderBottomRightRadius: 300,
    //     borderTopLeftRadius: 150,
    //     borderTopRightRadius: 150,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "yellow",
    //     elevation: 10, // For Android shadow effect
    //     shadowColor: "#000", // For iOS shadow
    //     shadowOffset: { width: 0, height: -10 }, // Shadow only on top (negative height)
    //     shadowOpacity: 0.25,
    //     shadowRadius: 10,
    // },
    support: {
        height: 100,
        width: 175,
        position: "absolute",
        top: 150,
        right: 22,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow",
        shadowOffset: { width: 0, height: 10 }, // Shadow only on bottom (positive height)
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

    screenTitle: {
        color: "#FFFFFF",
        fontSize: 12,
        fontFamily: "Arial",
        marginBottom: 4,
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
    labelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    labelText: {
        color: "#FFFFFF",
        fontSize: 10,
        fontFamily: "Arial",
        marginTop: 20
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "relative"
    },
    resetButtonContainer: {
        position: "absolute",
        top: -43, // Matches your original layout
        right: 13, // Aligns to the right
    },
    lightButtonContainer: {
        position: "absolute",
        top: -43, // Matches your original layout
        left: 13, // Aligns to the left
    },
    countButtonContainer: {
        position: "absolute",
        top: -43, // Adj
    },
})

// <View style={styles.container}>
//     <View>
//         <View style={styles.body}>
//             <View style={styles.screen}>
//                 <Text style={styles.screenTitle}>Fivet Tasbeeh</Text>
//                 <View
//                 style={[
//                     styles.countDisplay,
//                     { backgroundColor: light ? "#56fe0b" : "#97a29a" },
//                 ]}
//                 >
//                     <Text style={styles.countText}>{count.toString().padStart(3, "0")}</Text>
//                 </View>
//                 {/* <View style={styles.labelContainer}>
//                     <Text style={styles.labelText}>Light</Text>
//                     <Text style={styles.labelText}>RESET</Text>
//                 </View> */}
//             </View>
//             <View style={{alignItems: "center", justifyContent: "center"}}>
//                 <View style={{
//                     position:"absolute",
//                     top: 50,
//                 }}>
//                     <MetallicButton size={55} onPress={handleCount} />
//                 </View>
//                 <View style={{
//                     position:"absolute",
//                     top: 10,
//                     left: 55
//                 }}>
//                     <MetallicButton size={30} label={"R"} onPress={handleReset} />
//                 </View>
//                 <View style={{
//                     position:"absolute",
//                     top: 10,
//                     right: 55
//                 }}>
//                     <MetallicButton size={30} label={"L"} onPress={handleLight} />
//                 </View>
//             </View>
//         </View>
//     </View>
// </View>

// const { width } = Dimensions.get("window");

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         // backgroundColor: "#f8f9fa",
//     },
//     loadingText: {
//         fontSize: 18,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginTop: 20,
//     },
//     counterContainer: {
//         width: width * 0.7,
//         height: width * 0.7,
//         borderRadius: width * 0.35,
//         backgroundColor: "#ddd",
//         justifyContent: "center",
//         alignItems: "center",
//         marginBottom: 30,
//     },
//     countText: {
//         fontSize: 60,
//         fontFamily: "Digital_7",
//         textAlign: "center",
//     },
//     setText: {
//         fontSize: 24,
//         fontWeight: "bold",
//         color: "#333",
//         marginBottom: 20,
//     },
//     buttonContainer: {
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 20,
//     },
//     smallButtons: {
//         gap: 20,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginTop: 20,
//         width: width * 0.4,
//     },
// });

// 2nd design
// <View style={styles.container}>
//     <View style={[styles.counterContainer, { borderColor, borderWidth }]}>
//         <Text style={[styles.countText, { color: light ? "#56fe0b" : "#000" }]}>
//             {count.toString().padStart(3, "0")}
//         </Text>
//     </View>
//     <Text style={styles.setText}>Sets: {setCounter}</Text>
//     <View style={styles.buttonContainer}>
//         <View>
//             <View style={styles.smallButtons}>
//                 <MetallicButton size={80} onPress={handleCount} />
//                 <MetallicButton size={50} onPress={handleReset} label={"R"} />
//             </View>
//         </View>
//     </View>
// </View>