import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";


const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;


const firebaseConfig = {
  apiKey,
  authDomain: "lms-64375.firebaseapp.com",
  projectId: "lms-64375",
  storageBucket: "lms-64375.appspot.com",
  messagingSenderId: "97745610597",
  appId: "1:97745610597:web:720a198015fcd93ca0e38c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };