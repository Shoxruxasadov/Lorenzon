import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADn_8QDFiOMc8M1GlHpoLbdDenNF5UZ-E",
  authDomain: "lorezoz.firebaseapp.com",
  projectId: "lorezoz",
  storageBucket: "lorezoz.appspot.com",
  messagingSenderId: "1072823927945",
  appId: "1:1072823927945:web:5d0d7b2d3fa0c311a33258",
  measurementId: "G-QD9LV10BCN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();
