import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { WalkForm } from './src/screens/walkForm.screen';
import { WalkHistory } from './src/screens/walkHistory.screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const Stack = createNativeStackNavigator<RootStackParamList>();
const tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}

// for 
// export type RootStackParamList = {
//   'History': undefined;
//   'Add Walk': undefined;
// };

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    height: 60,
  },
  tabLabel: {
    fontSize: 14,
    marginBottom: 6,
  },
});

const screenOptions = {
  headerShown: true,
  tabBarActiveTintColor: '#007aff',
  tabBarInactiveTintColor: '#aaa',
  tabBarStyle: styles.tabBar,
  tabBarLabelStyle: styles.tabLabel,
};
