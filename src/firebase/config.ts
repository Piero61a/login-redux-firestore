// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBQH5PwAzZbjPGm0W8PVfGl_03BTMOC9mc',
  authDomain: 'redux-journal-b551d.firebaseapp.com',
  projectId: 'redux-journal-b551d',
  storageBucket: 'redux-journal-b551d.appspot.com',
  messagingSenderId: '205744807572',
  appId: '1:205744807572:web:9148da9d0857cab19e9e81',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
