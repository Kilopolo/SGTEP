import GestionarNotas from "./components/notas/GestionarNotas.js";
import AppIntro from "./components/AppIntro.js";

import { Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
// FIREBASE
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import LoadingLogo from "./components/LoadingLogo.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, "notification_received");

// Get a list of cities from your database
async function getUsers(db) {
  const usersCol = collection(db, "notas");
  console.log(usersCol);
  const userSnapshot = await getDocs(usersCol);
  console.log(userSnapshot);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  console.log(userList);
  return userList;
}



const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore(app);
      const usersList = await getUsers(db);
      setUsers(usersList);
      setLoading(false);
    };

    fetchUsers();
  }, []);
  if (loading) {
    return <LoadingLogo></LoadingLogo>;
  }
  return (
    <div>
      <ul>
        {" "}
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <GestionarNotas></GestionarNotas>
      <Button href="#">Link</Button>
      <Button type="submit">Button</Button> <AppIntro></AppIntro>
    </div>
  );
};

export default App;
