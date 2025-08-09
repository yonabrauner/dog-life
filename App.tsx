import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

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
