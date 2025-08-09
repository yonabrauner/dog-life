import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import  { getReactNativePersistence, GoogleAuthProvider, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBAk_jkdHHV2EsIT-N1FwSfhFHyNzks0NI",
  authDomain: "dog-life-cfade.firebaseapp.com",
  projectId: "dog-life-cfade",
  storageBucket: "dog-life-cfade.firebasestorage.app",
  messagingSenderId: "599300045306",
  appId: "1:599300045306:web:425fa110d5d8496b57cc43",
  measurementId: "G-KPDHHL6M29"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const googleProvider = new GoogleAuthProvider();
