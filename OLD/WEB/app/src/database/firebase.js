
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import firebaseConfig from "./firebase-config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigReal = firebaseConfig; 

  
const app=initializeApp(firebaseConfigReal);
export const firestore=getFirestore(app);