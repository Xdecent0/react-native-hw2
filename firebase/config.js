import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAoefHc6LTfv2o9D11ntxuhgAXmTgR4E2w",
  authDomain: "rn-social-d47cb.firebaseapp.com",
  projectId: "rn-social-d47cb",
  storageBucket: "rn-social-d47cb.appspot.com",
  messagingSenderId: "345557411593",
  appId: "1:345557411593:web:dae12f20a5524a11a8d5d8",
  measurementId: "G-YQC9R1HX1E"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export { auth };

export const db = getFirestore(app);
