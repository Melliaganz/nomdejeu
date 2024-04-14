import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, remove } from 'firebase/database';
import { getAuth, signInAnonymously, updateProfile, onAuthStateChanged } from 'firebase/auth';
import ModalDeco from "./components/ModalDéco";

import "./App.css"
import Home from "./pages/Home";
import Header from "./components/Header";
import RoomDetails from "./pages/RoomDetails";

function App() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const ACCOUNT_EXPIRATION_DURATION = 24 * 60 * 60 * 1000; // 1 jour en millisecondes

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
  const database = getDatabase(firebaseApp);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        handleSignIn(); // Créer automatiquement un compte anonyme si aucun utilisateur n'est connecté
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const { user: signedInUser } = await signInAnonymously(getAuth(firebaseApp));
      if (!signedInUser) throw new Error("L'authentification anonyme a échoué.");

      const userNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const displayName = `Invité#${userNumber}`;
      console.log(displayName)
      await updateProfile(signedInUser, { displayName });

      setUser(signedInUser);

      setTimeout(async () => {
        try {
          await remove(ref(database, `users/${signedInUser.uid}`));
          console.log(`Compte anonyme "${displayName}" supprimé après expiration de la durée de vie.`);
        } catch (error) {
          console.error('Erreur lors de la suppression du compte anonyme :', error);
        }
      }, ACCOUNT_EXPIRATION_DURATION);
    } catch (error) {
      console.error('Erreur lors de l\'authentification anonyme :', error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <Header user={user} displayName={user ? user.displayName : null} />
      <Routes>
        <Route element={<Home database={database} />} path="/" />
        <Route element={<RoomDetails database={database} />} path="/room/:roomId" />
      </Routes>
      <ModalDeco isOpen={showModal} onClose={() => setShowModal(false)} onRefresh={handleRefresh} />
    </BrowserRouter>
  );
}

export default App;
