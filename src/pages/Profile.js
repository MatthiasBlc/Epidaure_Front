import React, { useEffect, useState } from 'react';
import APIManager from '../services/api';

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [practiceData, setPracticeData] = useState();

    const getUserData = async () => {
        const { data } = await APIManager.memberData()
        setUserData(data.user);
        return data;
    };

    const getPracticeData = async (practice_id) => {
        const data = await APIManager.practiceData(practice_id)
        setPracticeData(data);
        console.log(data);
        return data;
    };

    const getData = async() => {
        const michel = await getUserData();
        console.log(michel);
        getPracticeData(michel.user.practice_id);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>{practiceData.name}</div>
    );
};

export default Profile;