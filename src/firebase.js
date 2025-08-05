// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDj1iXet2b8B7RBx41fZlWZ9zblDHthhxo",
  authDomain: "phone-directory-7489a.firebaseapp.com",
  projectId: "phone-directory-7489a",
  storageBucket: "phone-directory-7489a.firebasestorage.app",
  messagingSenderId: "209210466284",
  appId: "1:209210466284:web:539849202f6b110b3e6ac9",
  measurementId: "G-DXWPVM27VT"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
