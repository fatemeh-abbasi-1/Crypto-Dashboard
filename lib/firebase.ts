// /lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB95xyVzASXmiogXbo4hnn3SwkBEY-3CmA",
  authDomain: "crypto-dashboard-e2a51.firebaseapp.com",
  projectId: "crypto-dashboard-e2a51",
  storageBucket: "crypto-dashboard-e2a51.firebasestorage.app",
  messagingSenderId: "168801150947",
  appId: "1:168801150947:web:7dd4b1a549363d7437a2d6",
  measurementId: "G-2V343DDK6Z",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
