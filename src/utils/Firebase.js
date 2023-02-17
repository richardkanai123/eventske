// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhfejtk1EEqOFFx4JIcXHrXNPWCGJEvfQ",
    authDomain: "eventske-8f247.firebaseapp.com",
    projectId: "eventske-8f247",
    storageBucket: "eventske-8f247.appspot.com",
    messagingSenderId: "394347984267",
    appId: "1:394347984267:web:82dc267000c1f86cc02b8e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firestore
export const db = getFirestore(app);

// storage bucket
export const storage = getStorage(app);

// authentication
export const Auth = getAuth(app)

