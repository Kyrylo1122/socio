// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRL0sUFHusGT2TwQnDC9g57A6BHINwuyI",
  authDomain: "socio-8bee2.firebaseapp.com",
  projectId: "socio-8bee2",
  storageBucket: "socio-8bee2.appspot.com",
  messagingSenderId: "279293904265",
  appId: "1:279293904265:web:9632d6ffff0a0209828d58",
  measurementId: "G-B6DYR6QVC6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
