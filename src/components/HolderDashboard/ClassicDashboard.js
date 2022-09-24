import React, { useEffect, useState } from "react";
import APIManager from "../../services/api";
import PracticeData from "./Practice/PracticeData";

const ClassicDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [practiceData, setPracticeData] = useState([]);
  const [usersPractice, setUsersPractice] = useState([]);
  const [patients, setPatients] = useState([]);

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

  const getPatientsData = async () => {
    const data = await APIManager.patientsData();
    setPatients(data);
    return data;
  };

  const getData = async () => {
    const michel = await getUserData();
    getPracticeData(michel.user.practice_id);
    getPatientsData(michel.user.patient);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full">
      <div className="w-full flex-column">
        <h2 className="mt-8 my-2 text-1xl font-bold leading-tight text-left text-gray-800">
          Dashboard: {userData.email}
        </h2>
        <div className="w-full mb-4">
          <div className="mb-10 h-1 gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="md:w-1/2 h-auto border border-green rounded-xl p-2 shadow-lg">
          <PracticeData
            name={practiceData.name}
            adress={practiceData.adress}
            email={practiceData.email}
          />
        </div>
        <div className="mt-5 md:w-1/2 h-auto border border-green rounded-xl p-2 shadow-lg">
        <h1 className="text-1xl font-bold leading-tight">Mes patients:</h1>
      <div className="w-full mb-4">
        <div className="mb-6 h-1 gradient w-30 opacity-25 my-0 py-0 rounded-t"></div>
      </div>
      <ul className="flex-column">
        {patients &&
          patients.map((patient, index) => (
            <div key={index}>
              <li className="w-1/2 flex flex-row flex-wrap justify-between mt-2">
                <p>
                  <b>{patient.name}:</b> {patient.email}
                </p>
              </li>
            </div>
          ))}
      </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassicDashboard;
