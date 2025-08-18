import React from 'react';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen.screen';
import { WalkHistory } from '../screens/walkHistory.screen';
import { WalkForm } from '../screens/walkForm.screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootInitializer } from '../init/RootInitializer';
import { MyTheme } from '../constants/Theme';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { LoginSignup } from '../screens/LoginSignup.screen';

const Tab = createBottomTabNavigator();

const TabButton: React.FC<BottomTabBarButtonProps> = ({ children, accessibilityState, onPress, style }) => {
  // const isSelected = accessibilityState?.selected;
  return(
    <TouchableOpacity
      style={[styles.buttonBase, style]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}


export default function AppNavigator() {
  return (
    <NavigationContainer theme={MyTheme}>
      <RootInitializer />
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            height: 100,
          },
          tabBarLabelStyle: {
            fontFamily: "Quicksand_600SemiBold",
          }
        // tabBarIcon: ({ color, size }) => {
        //   let iconName: string;

        //   if (route.name === 'Home') iconName = 'home-outline';
        //   else if (route.name === 'History') iconName = 'list-outline';
        //   else iconName = 'add-circle-outline';

        //   return <Ionicons name={iconName} size={size} color={color} />;
        // },
      })}
      >
        <Tab.Screen
          name="History"
          component={WalkHistory}
          options={{
            tabBarButton: (props) => <TabButton {...props} style={styles.sideButton} />,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="list-outline"
                size={28}
                color={focused ? MyTheme.colors.primary : MyTheme.colors.secondary}
              />
            ),    
          }}
        />
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarButton: (props) => <TabButton {...props} style={styles.centerButton} />,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home-outline"
                size={28}
                color={focused ? MyTheme.colors.primary : MyTheme.colors.secondary}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Add Walk"
          component={WalkForm}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="add-circle-outline"
                size={28}
                color={focused ? MyTheme.colors.primary : MyTheme.colors.secondary}
              />
            ),
            tabBarButton: (props) => <TabButton {...props} style={styles.sideButton} />,
          }}
        />
        {/* <Tab.Screen name="Login" component={LoginSignup} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    // flex: 1,
    marginHorizontal: 30,
    borderRadius: 40,
    backgroundColor: MyTheme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    fontFamily: "Quicksand_400Regular",
  },
  sideButton: {
    height: 70,
    width: 70,
    marginTop: -20,
  },
  centerButton: {
    height: 70,
    width: 70,
    marginTop: 2, // drop it lower
    // backgroundColor: MyTheme.colors.primary,
  },
  selectedButton: {
    backgroundColor: MyTheme.colors.primary, // highlight color
  },
});