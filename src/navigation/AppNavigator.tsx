import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen.screen';
import { WalkHistory } from '../screens/walkHistory.screen';
import { WalkForm } from '../screens/walkForm.screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootInitializer } from '../init/RootInitializer';
// import { LoginSignup } from '../screens/LoginSignup.screen';

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#527bd3ff',
    background: '#ccdef1ff',
    card: '#e2ebf5ff',
    text: '#111827',
    border: 'rgba(208, 208, 240, 1)',
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={MyTheme}>
      <RootInitializer />
      <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'History') iconName = 'list-outline';
          else iconName = 'add-circle-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      >
        <Tab.Screen name="History" component={WalkHistory} options={{headerShown: false}}/>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add Walk" component={WalkForm} />
        {/* <Tab.Screen name="Login" component={LoginSignup} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}