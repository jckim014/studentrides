// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuo5qXhIg8n7xaQC5i5sjDhx7aswvF6-E",
  authDomain: "student-rides-71893.firebaseapp.com",
  projectId: "student-rides-71893",
  storageBucket: "student-rides-71893.appspot.com",
  messagingSenderId: "713292793219",
  appId: "1:713292793219:web:0be3fbeae35ee7d5c722b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);