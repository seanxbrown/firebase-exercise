// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHvOIsm-BKBQ5u_1Tbx1qGOGzTbpjFbYI",
  authDomain: "fir-exercise-85d6f.firebaseapp.com",
  projectId: "fir-exercise-85d6f",
  storageBucket: "fir-exercise-85d6f.appspot.com",
  messagingSenderId: "431217489563",
  appId: "1:431217489563:web:34d5b02db2a4c21c39b83e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();




export {app, auth} 