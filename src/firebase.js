// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMOZqSp4yKzdxoyl9P4tYXbonGlAd4PAw",
  authDomain: "gamelatch-7eb0c.firebaseapp.com",
  projectId: "gamelatch-7eb0c",
  storageBucket: "latchscore.appspot.com",
  messagingSenderId: "1068757573090",
  appId: "1:1068757573090:web:d84bb683c865c7d251adbb",
  measurementId: "G-JK9T2YZ6RC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);