import { useAtom } from 'jotai';
import React from 'react';
import GestionPraticienTitulaire from '../components/GestionPraticienTitulaire/GestionPraticienTitulaire';
import Sidebar from '../components/Sidebar/Sidebar';
import { currentUserAtom } from '../services/Atoms/currentUser';

const Dashboard = () => {

    const [currentUser,] = useAtom(currentUserAtom);
    const currentUserStatus = JSON.parse(currentUser).status;

    if (currentUserStatus === "collaborator") return ( 
        <>
            <h1>Collaborator</h1>
        </>
    )
    if (currentUserStatus === "holder") return ( 
        <div className='flex gap-6'>
            <Sidebar />
            <GestionPraticienTitulaire />
        </div>
    )
    if (currentUserStatus === "administrator") return ( 
        <>
          <h1>Administrator</h1>
        </>
    )
    return (
        <>
        ERROR 404
        </>
    );
};

export default Dashboard;