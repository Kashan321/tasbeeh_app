import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useContext } from 'react';
import { primary_color } from '../Constants/Colors';
import { LocationContext } from '../Context/LocationContext';

const EnableLocation = () => {
  const { requestLocationPermission } = useContext(LocationContext);

  const handleLocationPermission = async () => {
    const permissionGranted = await requestLocationPermission();
    if (permissionGranted) {
      Alert.alert('Success', 'Location enabled successfully.');
    } else {
      Alert.alert('Error', 'Permission to access location was denied.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/Icons/location.png')} style={styles.mainImage} />
        <Text style={styles.title}>Enable Location</Text>
        <TouchableOpacity style={styles.button} onPress={handleLocationPermission}>
          <Text style={styles.buttonText}>Allow Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnableLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  mainImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: primary_color,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Adds space below the button
  },
  buttonText: {
    color: primary_color,
    fontWeight: 'bold',
  },
});