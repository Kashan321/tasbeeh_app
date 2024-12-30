import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MetallicButton = ({ onPress, label, size = 120 }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <View style={[styles.container, { width: size, height: size }]}>
                {/* Outer Gradient Circle */}
                <LinearGradient
                    colors={["#8E8E8E", "#D0D0D0", "#F5F5F5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.outerCircle, { width: size, height: size, borderRadius: size / 2 }]}
                >
                    {/* Inner Gradient Circle */}
                    <LinearGradient
                        colors={["#F0F0F0", "#FFFFFF", "#D0D0D0"]}
                        start={{ x: 0.2, y: 0.2 }}
                        end={{ x: 0.8, y: 0.8 }}
                        style={[styles.innerCircle, { width: size * 0.9, height: size * 0.9, borderRadius: size * 0.45 }]}
                    >
                        {/* Center Circle */}
                        <View style={[styles.centerCircle, { width: size * 0.75, height: size * 0.75, borderRadius: size * 0.375 }]}>
                            {/* Button Label */}
                            {label && <Text style={styles.buttonText}>{label}</Text>}
                        </View>
                    </LinearGradient>
                </LinearGradient>
                {/* Highlight effect */}
                <LinearGradient
                    colors={["rgba(255,255,255,0.8)", "rgba(255,255,255,0)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.8, y: 0.8 }}
                    style={[styles.highlight, { width: size, height: size, borderRadius: size / 2 }]}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    outerCircle: {
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10, // Android shadow
    },
    innerCircle: {
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, y: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    centerCircle: {
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        color: "#444",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    highlight: {
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.5,
    },
});

export default MetallicButton;
