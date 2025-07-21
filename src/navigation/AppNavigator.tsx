import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen.screen';
import { WalkHistory } from '../screens/walkHistory.screen';
import { WalkForm } from '../screens/walkForm.screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string;

            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'History') iconName = 'list-outline';
            else iconName = 'add-circle-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: true,
        })}
      >
        <Tab.Screen name="History" component={WalkHistory} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add Walk" component={WalkForm} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}