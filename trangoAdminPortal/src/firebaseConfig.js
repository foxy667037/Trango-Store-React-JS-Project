import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";  // Import getAuth and GoogleAuthProvider

const firebaseConfig = {
  apiKey: "AIzaSyDw5p8PB1lq6Bs4QbNN4xMCuppEFolTK30",
  authDomain: "trango-garments.firebaseapp.com",
  projectId: "trango-garments",
  storageBucket: "trango-garments.firebasestorage.app",
  messagingSenderId: "477729927305",
  appId: "1:477729927305:web:726660bafe441cdcf1d658",
  measurementId: "G-GVNJ82QE7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };