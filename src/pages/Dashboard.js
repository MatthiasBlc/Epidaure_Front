import React from "react";
// import { useLocation } from "react-router-dom";
import CoworkersPlanning from "../components/CoworkersPlanning/CoworkersPlanning";
import GestionPraticienTitulaire from "../components/GestionPraticienTitulaire/GestionPraticienTitulaire";
import MyPlanning from "../components/MyPlanning/MyPlanning";
import RoomsPlanning from "../components/RoomsPlanning/RoomsPlanning";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {
  // const location = useLocation();

  return (
    <div className="flex gap-6">
      <Sidebar />
      <GestionPraticienTitulaire />
    </div>
  );
};

export default Dashboard;
