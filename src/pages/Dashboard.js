import React from 'react';
import GestionPraticienTitulaire from '../components/GestionPraticienTitulaire/GestionPraticienTitulaire';
import Sidebar from '../components/Sidebar/Sidebar';

const Dashboard = () => {

    return (
        <div className='flex gap-6'>
            <Sidebar />
            <GestionPraticienTitulaire />
        </div>
    );
};

export default Dashboard;