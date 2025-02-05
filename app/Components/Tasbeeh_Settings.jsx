import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { primary_color } from "../Constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext } from "react";
import { TasbeehColorContext } from "../Context/TasbeehColorContext";

const Tasbeeh_Settings = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const { updateColor } = useContext(TasbeehColorContext);

  // Handle color change
  const handleColorChange = (color) => {
    updateColor(color);
    Alert.alert("Success", "Tasbeeh color updated!");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      width: width,
      height: height * 0.12,
      backgroundColor: primary_color,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    headerCont: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      width: '100%',
    },
    backButton: {
      flex: 1,
      alignItems: 'flex-start',
    },
    title: {
      flex: 3,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    optionContainer: {
      backgroundColor: 'white',
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 20,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 2,
    },
    optionText: {
      fontSize: 18,
      color: '#333',
      marginLeft: 10,
    },
    colorsContainer: {
      marginTop: 30,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCont}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Tabs')}>
            <Ionicons name="arrow-back-sharp" size={28} color="white" />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.headerText}>Tasbeeh Colour</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </View>

      <View style={styles.colorsContainer}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => handleColorChange('#0891b2')}
        >
          <View style={{height:"100%", width:200, backgroundColor:"#0891b2", marginLeft: 20, borderRadius: 20}}></View>
          <Text style={styles.optionText}>Blue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => handleColorChange('#56fe0b')}
        >
          <View style={{height:"100%", width:200, backgroundColor:"#56fe0b", marginLeft: 20, borderRadius: 20}}></View>
          <Text style={styles.optionText}>Green</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => handleColorChange('#ff0000')}
        >
          <View style={{height:"100%", width:200, backgroundColor:"#ff0000", marginLeft: 20, borderRadius: 20}}></View>
          <Text style={styles.optionText}>Red</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Tasbeeh_Settings;