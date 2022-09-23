import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import APIManager from "../../services/api";
import RoomData from "./Room/RoomData";
import PracticeData from "./Practice/PracticeData";
import UserData from "./User/UserData";

const GestionPraticienTitulaire = () => {
  const [userData, setUserData] = useState([]);
  const [practiceData, setPracticeData] = useState([]);
  const [usersPractice, setUsersPractice] = useState([]);

  const getUserData = async () => {
    const { data } = await APIManager.memberData();
    setUserData(data.user);
    return data;
  };

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeData(data);
    setUsersPractice(data.users);
    return data;
  };

  const getData = async () => {
    const michel = await getUserData();
    getPracticeData(michel.user.practice_id);
  };

  useEffect(() => {
    getData();
  }, []);

 

  return (
    <div className="w-full">
      <div className="w-full flex-column">
        <h2 className="mt-8 my-2 text-1xl font-bold leading-tight text-left text-gray-800">
          Gestion praticien titulaire {userData.email}
        </h2>
        <div className="w-full mb-4">
          <div className="mb-10 h-1 gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="containerGrid1 mr-4 h-auto">
          <div className="child1 w-full h-auto">
            {/* MENU PRACTICE */}
            <div className="flex flex-col w-full h-auto border border-green rounded-xl p-2 shadow-lg">
              <PracticeData
                name={practiceData.name}
                adress={practiceData.adress}
                email={practiceData.email}
              />
            </div>

            {/* MENU ROOMS */}
            <div className=" flex flex-col w-full h-auto border border-green mt-10 rounded-xl p-2 shadow-lg">
              <RoomData />
            </div>
          </div>

          {/* MENU USERS */}
          <div className="child2 flex flex-col w-full h-full border border-green rounded-xl p-2 shadow-lg">
              <UserData />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default GestionPraticienTitulaire;
