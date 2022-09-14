import React, { useState } from 'react';
import APIManager from '../services/api';


const Profile = () => {
    const [userData,setUserData] = useState();

    async function asyncCall() {
        const response = await APIManager.memberData()
        .catch(
            (error) => {
                alert("erreur");
                console.log(error.message);
            }
            );
        setUserData(response.user);
        console.log(userData);
    }
    // asyncCall();

    return (      
        <div>
            {/* <p>{userData}</p> */}
            <button class="btn">Profile</button>
        </div>
    );
};

export default Profile;