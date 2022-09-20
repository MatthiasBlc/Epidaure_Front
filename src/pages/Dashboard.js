import { useAtom } from "jotai";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { currentUserAtom } from "../services/Atoms/currentUser";

const Dashboard = () => {
  const [currentUser] = useAtom(currentUserAtom);
  const currentUserStatus = JSON.parse(currentUser).status;

  if (currentUserStatus === "collaborator")
    return (
      <div className="flex gap-6">
        <Sidebar />
        <Outlet />
      </div>
    );
  if (currentUserStatus === "holder")
    return (
      <div className="flex gap-6">
        <Sidebar />
        <Outlet />
      </div>
    );
  if (currentUserStatus === "administrator")
    return (
      <div className="flex gap-6">
        <Sidebar />
        <Outlet />
      </div>
    );
  return <>ERROR 404</>;
};

export default Dashboard;
