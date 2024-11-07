import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB731uBUaYeoYhWTvQWLiA8pDaqxHnk63A",
  authDomain: "dg-dogru-gerikazanim.firebaseapp.com",
  projectId: "dg-dogru-gerikazanim",
  storageBucket: "dg-dogru-gerikazanim.firebasestorage.app",
  messagingSenderId: "61938160145",
  appId: "1:61938160145:web:f639633c2f826d697017b0",
  measurementId: "G-SSNRGNB4QM"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };