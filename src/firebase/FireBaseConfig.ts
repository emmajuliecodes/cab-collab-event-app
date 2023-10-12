// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY as string,
	authDomain: import.meta.env.VITE_AUTHDOMAIN as string,
	projectId: import.meta.env.VITE_PROJECTID as string,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET as string,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID as string,
	appId: import.meta.env.VITE_APPID as string,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
