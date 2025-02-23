import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_CONFIG } from './config'; // Make sure config.js contains FIREBASE_CONFIG

// ✅ Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

// ✅ Ensure auth persists session in React Native
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
