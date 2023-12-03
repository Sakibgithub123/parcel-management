// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucke,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDTxV7b4X7MXOMnGGKZPq7GK8NUg6AMk40",
//   authDomain: "parcel-management-client-80793.firebaseapp.com",
//   projectId: "parcel-management-client-80793",
//   storageBucket: "parcel-management-client-80793.appspot.com",
//   messagingSenderId: "647284157973",
//   appId: "1:647284157973:web:1da464c739fa3671d6a81c",
//   measurementId: "G-5WZNVW092Q"
// };

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export default app;