import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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