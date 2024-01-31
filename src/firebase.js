// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBT1m4KflttLL9qJPm8B1mtcd1t5eKdIE",
  authDomain: "selefinance-b5376.firebaseapp.com",
  projectId: "selefinance-b5376",
  storageBucket: "selefinance-b5376.appspot.com",
  messagingSenderId: "161575128983",
  appId: "1:161575128983:web:ae3670f34fffc64bc8bed2",
  measurementId: "G-5T6Q376REH"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// initialize Firebase storage service and get a reference to the service.
const storage = getStorage(app);

export { auth, db, storage };

// initialize Firebase storage service and get a reference to the service.
