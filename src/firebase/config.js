import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4H4zAiOjN8Q6WRRpivMLGeA1IsL5s3Gg",
  authDomain: "shopping-app-bfd0f.firebaseapp.com",
  projectId: "shopping-app-bfd0f",
  storageBucket: "shopping-app-bfd0f.firebasestorage.app",
  messagingSenderId: "342816597979",
  appId: "1:342816597979:web:86bcd61ef35455c3cd69fe",
  measurementId: "G-RVVF1HMLJL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);