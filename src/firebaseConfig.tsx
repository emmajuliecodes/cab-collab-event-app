import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDNorWmNoH9j_YHqdsi8fkAtDhjhcnG_B4",
	authDomain: "cab-collab-event-app.firebaseapp.com",
	projectId: "cab-collab-event-app",
	storageBucket: "cab-collab-event-app.appspot.com",
	messagingSenderId: "711329593706",
	appId: "1:711329593706:web:6af7536e7e21919e798d13",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
