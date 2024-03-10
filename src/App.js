import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';

import "./App.css"
import Home from "./pages/Home";
import Header from "./components/Header";


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

function App() {


  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route element={<Home database={database}/>} path="/" />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
