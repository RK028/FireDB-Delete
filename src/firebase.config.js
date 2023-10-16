// Import the functions you need from the SDKs you need
import firebse from "firebase/compat/app";
import 'firebase/compat/database';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}

// Initialize Firebase
const app = firebse.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
 

 
 
