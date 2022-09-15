import React from 'react';
import GestionPraticienTitulaire from '../components/GestionPraticienTitulaire/GestionPraticienTitulaire';
import Sidebar from '../components/Sidebar/Sidebar';
import {FaTh} from 'react-icons/fa';

const Dashboard = () => {
    const menuItem=[
        {
            path: "/gestionPT",
            name: "Gestion PT",
            icon: <FaTh/>,
        },
        {
            path: "/",
            name: "",
            icon: "",
        },
        {
            path: "/",
            name: "",
            icon: "",
        },
    ]

    return (
        <div>
            <Sidebar />
            <GestionPraticienTitulaire />
        </div>
    );
};

export default Dashboard;