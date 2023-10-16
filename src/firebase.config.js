// Import the functions you need from the SDKs you need
import firebse from "firebase/compat/app";
import 'firebase/compat/database';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAetxAevTHT1cHFL8kSM9ez_xzyOGjtoIQ",
  authDomain: "curd-798f5.firebaseapp.com",
  databaseURL: "https://curd-798f5-default-rtdb.firebaseio.com",
  projectId: "curd-798f5",
  storageBucket: "curd-798f5.appspot.com",
  messagingSenderId: "145771089113",
  appId: "1:145771089113:web:b249fcbf4ab8d64f5f02c8",
  measurementId: "G-L65S574CND"
}

// Initialize Firebase
const app = firebse.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
 

 
 