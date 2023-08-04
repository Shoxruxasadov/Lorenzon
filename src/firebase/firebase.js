import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAe_R7gU0mXOFV2xw8Lf4Zeke0Lma3PPtQ",
  authDomain: "lorenzon-5479d.firebaseapp.com",
  projectId: "lorenzon-5479d",
  storageBucket: "lorenzon-5479d.appspot.com",
  messagingSenderId: "566189008165",
  appId: "1:566189008165:web:b268839dd610f7fc05e6cc",
  measurementId: "G-6J6VBG0C19"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
