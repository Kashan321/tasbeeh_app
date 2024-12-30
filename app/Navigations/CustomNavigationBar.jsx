import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons'; 
import AntDesign from '@expo/vector-icons/AntDesign';

const CustomNavigationBar = ({ state, descriptors, navigation }) => {
  if (!state) {
    console.error('State is undefined');
    return null;
  }

  const primaryColor = '#0891b2';
  const greyColor = '#737373';

  const ICONS = {
    Tasbeeh: (color) => <Feather name="home" size={24} color={color} />,
    Qibla: (color) => <Feather name="compass" size={24} color={color} />, 
    Prayers: (color) => <Feather name="clock" size={24} color={color} />, 
    Main: (color) => <AntDesign name="appstore-o" size={24} color={color} />,
    Settings: (color) => <Feather name="settings" size={24} color={color} />
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {ICONS[route.name]?.(isFocused ? primaryColor : greyColor)}
            <Text
              style={{
                color: isFocused ? primaryColor : greyColor,
                fontSize: 11,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    width: '90%',
    borderWidth: 0.2,
  },
  tabbarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default CustomNavigationBar;