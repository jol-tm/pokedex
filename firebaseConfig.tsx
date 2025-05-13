// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDemSPKaWTtnfVDW1gbNUSlccuqWJ_M1Y",
  authDomain: "pokedex-2b319.firebaseapp.com",
  projectId: "pokedex-2b319",
  storageBucket: "pokedex-2b319.firebasestorage.app",
  messagingSenderId: "542237159448",
  appId: "1:542237159448:web:07fa117b7557fe9cecd36d",
  measurementId: "G-BB9K26JGR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }
