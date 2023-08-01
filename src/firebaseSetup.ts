import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBv4tfVkW59PTukiG_Md4IJCR0XKINea_Y',
  authDomain: 'image-sharing-app-569cb.firebaseapp.com',
  projectId: 'image-sharing-app-569cb',
  storageBucket: 'image-sharing-app-569cb.appspot.com',
  messagingSenderId: '383789105823',
  appId: '1:383789105823:web:682c2ba24d5dbc1f8c58aa',
  measurementId: 'G-3CC5MTYGCH'
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const firebaseCompat = firebase;

export const googleProvider = new GoogleAuthProvider();
