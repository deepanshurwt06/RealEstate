// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realstate-135fc.firebaseapp.com",
  projectId: "realstate-135fc",
  storageBucket: "realstate-135fc.firebasestorage.app",
  messagingSenderId: "932650608402",
  appId: "1:932650608402:web:76a616d98f98a9c72a75cb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);