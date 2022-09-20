import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex gap-6">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;