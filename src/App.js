import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route element={<Home/>} path="/" />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
