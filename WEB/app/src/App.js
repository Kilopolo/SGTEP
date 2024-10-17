
import GestionarNotas from "./components/notas/GestionarNotas.js";
import AppIntro from "./components/AppIntro.js";

import { Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
// FIREBASE
// import { initializeApp } from "firebase/app";
// import { getAnalytics, logEvent } from "firebase/analytics";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import LoadingLogo from "./components/LoadingLogo.js";
import SplashScreen from "./screens/SplashScreen.js";


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// logEvent(analytics, "notification_received");

// Get a list of cities from your database
// async function getUsers(db) {
//   const usersCol = collection(db, "notas");
//   console.log(usersCol);
//   const userSnapshot = await getDocs(usersCol);
//   console.log(userSnapshot);
//   const userList = userSnapshot.docs.map((doc) => doc.data());
//   console.log(userList);
//   console.log(userList.length);
//   return userList;
// }



const App = () => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const db = getFirestore(app);
  //     const usersList = await getUsers(db);
  //     setUsers(usersList);
  //     setLoading(false);
  //   };

  //   fetchUsers();
  // }, []);
  // if (loading) {
  //   return <LoadingLogo></LoadingLogo>;
  // }
  return (
    <div>
      {/* <ul>
        {" "}
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul> */}
      {/* <GestionarNotas></GestionarNotas> */}
     
      {/* <AppIntro></AppIntro> */}

      <SplashScreen></SplashScreen>

    </div>
  );
};

export default App;
