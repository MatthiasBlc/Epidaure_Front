import React, { useEffect, useState } from 'react';
import APIManager from '../services/api';

const Profil = () => {
    const [userData, setUserData] = useState({});
    const [practiceData, setPracticeData] = useState();

    const getUserData = async () => {
        const { data } = await APIManager.memberData()
        setUserData(data.user);
        console.log("con",data);
        return data;
    };

    const getPracticeData = async (practice_id) => {
        const data = await APIManager.practiceData(practice_id)
        setPracticeData(data);
        console.log(data);
        return data;
    };

    const getData = async () => {
        const michel = await getUserData();
        console.log("michel",michel);
        getPracticeData(michel.user.practice_id);
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const practice_id = userData.practice_id;
        const response = await APIManager.registerUser(email,password,practice_id)
        console.log("User crée", response)
    }


    if (practiceData === undefined) return (<h1>Loading...</h1>);

    return (
        <main>
            <h1>Dashboard {userData.email}</h1>
            <p>{userData.status}</p>
            <h2>Votre cabinet: {practiceData.name}</h2>
            <p>Adresse: {practiceData.adress}</p><br></br>

            <p>Créez un compte practicien</p>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="text"
                    id="email"
                />
                <label>Password</label>
                <input
                    type="text"
                    id="password"
                />
                <button type="submit">Submit</button>
            </form>

        </main>


    );
};

export default Profil;