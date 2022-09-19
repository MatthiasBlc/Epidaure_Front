import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Signup from "./components/Signup/signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import GestionPraticienTitulaire from "./components/GestionPraticienTitulaire/GestionPraticienTitulaire";
import Agenda from "./pages/Agenda";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/password" element={<ForgotPassword />} />
          <Route path="/users/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gestionPT" element={<GestionPraticienTitulaire />} />
          <Route path="/agenda" element={<Agenda />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
