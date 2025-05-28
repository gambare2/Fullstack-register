import { initializeApp } from "firebase-admin";
import {getAuth, GithubAuthProvider, GoogleAuthProvider} from 'firebase/auth';


const firebaseconfig  = {
  apiKey: "AIzaSyDUQRHkdBV3RInbSmN7h54ZvvRST2Ufl2g",
  authDomain: "login-page-ebd72.firebaseapp.com",
  projectId: "login-page-ebd72",
  storageBucket: "login-page-ebd72.firebasestorage.app",
  messagingSenderId: "51163584118",
  appId: "1:51163584118:web:59a21ef0c13f37a2cd7157",
  measurementId: "G-NEDYJV8NMW"
};

initializeApp({
    credential: applicationDefault(firebaseconfig),
})

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

