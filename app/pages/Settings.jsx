import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { primary_color } from '../Constants/Colors';

const THEME_COLOR = primary_color;

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View>
        <TouchableOpacity style={[styles.field1]} onPress={() => navigation.navigate('Tasbeeh_color')}>
          <Text style={styles.text}>TASBEEH COLOUR</Text>
        </TouchableOpacity>
        <View style={styles.field1}>
          <Text style={styles.text}>ABOUT THIS APP</Text>
        </View>
        <View style={styles.field1}>
          <Text style={styles.text}>HELP AND SUPPORT</Text>
        </View>
        <View style={styles.field1}>
          <Text style={styles.text}>PRIVACY POLICY</Text>
        </View>
        <View style={styles.field1}>
          <Text style={styles.text}>APP PREFRENCES</Text>
        </View>
      </View>
    </View>
  );
};

export default Settings;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background color
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME_COLOR, // Apply theme color
    marginBottom: 20,
  },
  field1: {
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: primary_color,
    borderRadius: 30,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: width * 0.07,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});