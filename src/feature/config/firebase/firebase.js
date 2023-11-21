/* eslint-disable */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcl0O4r2L3Xk1Qfn4cOWY2500seGYaTmo",
  authDomain: "kirmago-kir2023.firebaseapp.com",
  databaseURL: "https://kirmago-kir2023-default-rtdb.firebaseio.com",
  projectId: "kirmago-kir2023",
  storageBucket: "kirmago-kir2023.appspot.com",
  messagingSenderId: "943977170109",
  appId: "1:943977170109:web:e6a574a311eb833a98a3d4",
  measurementId: "G-NGQ8WV4BNX"
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);
const storage = getStorage(firebase);

export { db, firebase, auth, storage };