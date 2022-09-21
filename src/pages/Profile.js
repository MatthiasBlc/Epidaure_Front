import React, { useEffect, useState } from "react";
import APIManager from "../services/api";
import { currentUserAtom } from "../services/Atoms/currentUser";
import { useAtom } from "jotai";

const Profil = () => {
  const [userData, setUserData] = useState({});
  const [practiceData, setPracticeData] = useState();
  const [ _ ,setUserID] = useAtom(currentUserAtom);
  const [error,setError] = useState();

  const getUserData = async () => {
    const { data } = await APIManager.memberData();
    setUserData(data.user);
    return data;
  };

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeData(data);
    return data;
  };

  const getData = async () => {
    const data = await getUserData();
    getPracticeData(data.user.practice_id);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newEmail = e.target.newEmail.value;
    
    const data = await APIManager.editUser(newEmail)
    .catch((error) => {
      console.log(error.message);
      setError(error);
    });
    document.getElementById('emailUser').innerHTML=data.email;
    document.getElementById('error').innerHTML=error;
    setUserID(JSON.stringify(data.user));
    console.log();
  }

  const passwordSubmit = async(e) => {
    e.preventDefault();
    await APIManager.forgotPasswordUser(userData.email)
    .catch((error) => {
      console.log(error.message);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  

  if (practiceData === undefined) return <h1>Loading...</h1>;

  return (
    <div className="pl-20 pr-20 pt-20">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <div id="error"></div>
              <h1 className="mt-8 my-2 text-1xl font-bold leading-tight text-left text-gray-800">
                DASHBOARD:<span id="emailUser">{userData.email}</span> 
              </h1>
              <div className="w-full mb-4">
                <div className="mb-10 h-1 gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
              </div>
              <p>[{userData.status}]</p>
              <h2>
                <b>Votre cabinet:</b> {practiceData.name}
              </h2>
              <p>
                <b>Adresse:</b> {practiceData.adress}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <form method="POST" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" id="newEmail" defaultValue={userData.email} />
          <button type="submit">Sauvegarder</button>
        </form>
        <form method="POST" onSubmit={passwordSubmit}>
          <button type="submit">Reset password</button>
        </form>
      </div>
    </div>
  );
};

export default Profil;
