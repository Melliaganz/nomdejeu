import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { getAuth, signInAnonymously, updateProfile  } from 'firebase/auth'; 


import "./App.css"
import Home from "./pages/Home";
import Header from "./components/Header";
import RoomDetails from "./pages/RoomDetails"




function App() {
  const [user, setUser] = useState(null);
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };
  const firebaseApp = initializeApp(firebaseConfig);
  useEffect(() => {
    const auth = getAuth(firebaseApp);
    signInAnonymously(auth)
      .then((userCredential) => {
        // L'utilisateur anonyme est connecté
        const user = userCredential.user;
        const randomGuestNumber = Math.floor(Math.random() * 10000); // Génère un nombre aléatoire entre 0 et 9999
        const displayName = `Guest#${randomGuestNumber}`;
        updateProfile(auth.currentUser, { displayName }) // Met à jour le profil de l'utilisateur anonyme avec le nom d'utilisateur
          .then(() => {
            setUser(auth.currentUser);
          })
          .catch((error) => {
            console.error('Erreur lors de la mise à jour du profil :', error);
          });
      })
      .catch((error) => {
        console.error('Erreur d\'authentification anonyme :', error);
      });
  }, []);
  const database = getDatabase(firebaseApp);
  

  return (
    <BrowserRouter>
    <Header user={user}  />
    <Routes>
    <Route element={<Home database={database}/>} path="/" />
    <Route element={<RoomDetails database={database} />} path="/room/:roomId" />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
