import { Image, StyleSheet, View, Dimensions, Text } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import MainScreen from '../pages/MainScreen';

const { width, height } = Dimensions.get('window');

const MasjidBackground = () => {
    const bg = 'https://images.pexels.com/photos/6010467/pexels-photo-6010467.jpeg?auto=compress&cs=tinysrgb&w=1000'
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: bg }} // Load the image from the web
                style={styles.backgroundImage}
                resizeMode="cover" // Ensures the image covers the entire screen
            />
            <View style={styles.overlay}>
                <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.bismillahText}>
                        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </Text>
                    <MainScreen />
                </View>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Fill the entire screen
        width: '100%', // Ensures full width
        height: '100%', // Ensures full height
    },
    backgroundImage: {
        flex: 1, // Makes the image fill the entire container
        width: '100%', // Ensures the image takes the full width of the screen
        height: '100%', // Ensures the image takes the full height of the screen
        resizeMode: 'cover', // Ensures the image covers the screen while maintaining its aspect ratio
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.2)', // Semi-transparent overlay for text visibility
        justifyContent: 'center',
        alignItems: 'center',
    },
    bismillahText: {
        color: "white",
        textAlign: "center",
        fontSize: width * 0.1,
        position: "absolute",
        top: height * 0.1, // Adjusts the vertical position of the text
        alignSelf: 'center',
    },
});

export default MasjidBackground;