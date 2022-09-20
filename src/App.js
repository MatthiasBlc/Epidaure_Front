import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import PlanCollab from "./components/PlanCollab/PlanCollab";
import IndexDashboard from "./components/GestionPraticienTitulaire/IndexDashboard";
import PlanRooms from "./components/PlanRooms/PlanRooms";
import Planning from "./components/Planning/Planning";
import RequireAuth from "./hooks/requireAuth";

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
            <Route path="planning" element={<Planning />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
