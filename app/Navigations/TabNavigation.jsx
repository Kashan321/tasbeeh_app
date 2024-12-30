import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MasjidBackground from '../Components/MasjidBackgroud';
import New from '../pages/NewPage';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { Feather, AntDesign } from '@expo/vector-icons'; // Importing AntDesign
import PrayerTimings from '../pages/PrayerTimings';
import CustomNavigationBar from './CustomNavigationBar';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="Main"
          tabBar={(props) => <CustomNavigationBar {...props} />}
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              position: 'absolute',
              backgroundColor: 'white',
              borderTopWidth: 0,
            },
            tabBarBackground: () => (
              <BlurView
                tint="light"
                intensity={100}
                style={styles.blurBackground}
              />
            ),
          }}
        >
          <Tab.Screen
            name="Tasbeeh"
            component={MasjidBackground}
            options={{
              tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Qibla"
            component={New}
            options={{
              tabBarIcon: ({ color, size }) => <Feather name="compass" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Main"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => <AntDesign name="appstore-o" size={size} color={color} />, // Using AntDesign icon for "appstore-o"
            }}
          />
          <Tab.Screen
            name="Prayers"
            component={PrayerTimings}
            options={{
              tabBarIcon: ({ color, size }) => <Feather name="clock" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />,
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
});