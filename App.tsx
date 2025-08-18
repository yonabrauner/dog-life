import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_400Regular_Italic } from '@expo-google-fonts/inter';
import { Quicksand_400Regular, Quicksand_700Bold, Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';
import { ActivityIndicator, View } from 'react-native';

const tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Quicksand_700Bold,
    Quicksand_400Regular,
    Inter_400Regular,
    Inter_400Regular_Italic,
    Quicksand_600SemiBold,
  });
  if (!fontsLoaded) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
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