// Import the functions needed  from the SDKs
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDNorWmNoH9j_YHqdsi8fkAtDhjhcnG_B4',
  authDomain: 'cab-collab-event-app.firebaseapp.com',
  projectId: 'cab-collab-event-app',
  storageBucket: 'cab-collab-event-app.appspot.com',
  messagingSenderId: '711329593706',
  appId: '1:711329593706:web:6af7536e7e21919e798d13',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
