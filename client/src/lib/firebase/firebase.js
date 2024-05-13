import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAlCbZ23p3wVzWzi9RaSQRMYfa2psD9HP0",
    authDomain: "lorenzonuz.firebaseapp.com",
    projectId: "lorenzonuz",
    storageBucket: "lorenzonuz.appspot.com",
    messagingSenderId: "930290683306",
    appId: "1:930290683306:web:c63e86293b0a46f3546fd3"
};

let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const storage = getStorage(app);
export default app;