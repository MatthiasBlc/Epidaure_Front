import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import PlanCollab from "./pages/CollaboratorAgenda";
import PlanRooms from "./pages/RoomAgenda";
import RequireAuth from "./hooks/requireAuth";
import Agenda from "./pages/MyAgenda";
import IndexDashboard from "./components/HolderDashboard/IndexDashboard";
import Contact from "./components/Contact/Contact";
import Home from "./pages/HomePage/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/users/password" element={<ForgotPassword />} />
          <Route path="/users/:token" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route path="" element={<IndexDashboard />} />
            <Route path="plancollab" element={<PlanCollab />} />
            <Route path="planrooms" element={<PlanRooms />} />
            <Route path="planning" element={<Agenda />} />
            <Route path="plancollab" element={<PlanCollab />} />
            <Route path="planrooms" element={<PlanRooms />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
