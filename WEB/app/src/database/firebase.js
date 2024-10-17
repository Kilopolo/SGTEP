
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXOCg6ubHy4eikn43eGBqOfPBUSVaa528",
    authDomain: "sgt-ep.firebaseapp.com",
    projectId: "sgt-ep",
    storageBucket: "sgt-ep.appspot.com",
    messagingSenderId: "78620192919",
    appId: "1:78620192919:web:5b7734af2c241adc5339d2",
    measurementId: "G-0X10F012N2",
  };

  
const app=initializeApp(firebaseConfig);
export const firestore=getFirestore(app);