import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import "./App.css"
import Home from "./pages/Home";
import Header from "./components/Header";
import RoomDetails from "./pages/RoomDetails";
import Login from './pages/Login';

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
  const database = getDatabase(firebaseApp);

  useEffect(() => {
    const storedDisplayName = localStorage.getItem('displayName');
    if (storedDisplayName) {
      setUser({ displayName: storedDisplayName });
    } else {
      const userNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const displayName = `Anonyme#${userNumber}`;
      setUser({ displayName });
      localStorage.setItem('displayName', displayName);
    }
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} displayName={user ? user.displayName : null} />
      <Routes>
        <Route element={<Home database={database} />} path="/" />
        <Route element={<RoomDetails database={database} />} path="/room/:roomId" />
        <Route element={<Login database={database}/>} path="/login" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
