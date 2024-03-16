// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjab8QECWRkC61FpW-G8Qr7wlnW6Xbz4Q",
  authDomain: "jsalmanaque.firebaseapp.com",
  projectId: "jsalmanaque",
  storageBucket: "jsalmanaque.appspot.com",
  messagingSenderId: "479428500574",
  appId: "1:479428500574:web:cdccb96715d3efcc2468cf",
  measurementId: "G-7281XVCW19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }