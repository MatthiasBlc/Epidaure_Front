import React, { useEffect, useState } from "react";
import APIManager from "../services/api";

const Profil = () => {
  const [userData, setUserData] = useState({});
  const [practiceData, setPracticeData] = useState();

  const getUserData = async () => {
    const { data } = await APIManager.memberData();
    setUserData(data.user);
    console.log("con", data);
    return data;
  };

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeData(data);
    console.log(data);
    return data;
  };

  const getData = async () => {
    const michel = await getUserData();
    console.log("michel", michel);
    getPracticeData(michel.user.practice_id);
  };

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
              <h1 className="mt-8 my-2 text-1xl font-bold leading-tight text-left text-gray-800">
                DASHBOARD: {userData.email}
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
    </div>
  );
};

export default Profil;
