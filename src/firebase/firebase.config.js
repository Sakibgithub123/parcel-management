// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.Vite_ApiKey,
  authDomain: import.meta.env.Vite_AuthDomain,
  projectId: import.meta.env.Vite_ProjectId,
  storageBucket: import.meta.env.Vite_StorageBucket,
  messagingSenderId: import.meta.env.Vite_MessagingSenderId,
  appId: import.meta.env.Vite_AppId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);