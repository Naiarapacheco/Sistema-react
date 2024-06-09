import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB-wkbsYNht1kDYNPKv2hOHJx2gGw1Xux0",
    authDomain: "sistema-fdd3f.firebaseapp.com",
    projectId: "sistema-fdd3f",
    storageBucket: "sistema-fdd3f.appspot.com",
    messagingSenderId: "409582792471",
    appId: "1:409582792471:web:54e8d1e8013a63385e1152",
    measurementId: "G-4ZSRLMLTMF"
  };


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage }