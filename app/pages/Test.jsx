import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MetallicButton from '../Components/MetalicButton'

const Test = () => {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.body}>
                    <View style={styles.screen}>
                        <Text style={styles.screenTitle}>Fivet Tasbeeh</Text>
                        <View
                        // style={[
                        //     styles.countDisplay,
                        //     { backgroundColor: light ? "#56fe0b" : "#97a29a" },
                        // ]}
                        >
                            <Text style={styles.countText}>000</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>Light</Text>
                            <Text style={styles.labelText}>RESET</Text>
                        </View>
                    </View>
                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        <View style={{
                            position:"absolute",
                            top: 50,
                        }}>
                            <MetallicButton size={55} />
                        </View>
                        <View style={{
                            position:"absolute",
                            top: 10,
                            left: 55
                        }}>
                            <MetallicButton size={30} />
                        </View>
                        <View style={{
                            position:"absolute",
                            top: 10,
                            right: 55
                        }}>
                            <MetallicButton size={30} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Test

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
        backgroundColor: "yellow",
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
        fontSize: 35,
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