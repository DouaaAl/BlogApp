"use client"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa1whn8pVDgeR-eXAqvEGb63qjFhkedDY",
  authDomain: "blogapp-5278a.firebaseapp.com",
  projectId: "blogapp-5278a",
  storageBucket: "blogapp-5278a.appspot.com",
  messagingSenderId: "446632424953",
  appId: "1:446632424953:web:42910e69a3dd6d6b7db928",
  measurementId: "G-ZQC6EF79YZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
