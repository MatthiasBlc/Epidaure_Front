import React, { useEffect, useState, useNavigate } from "react";
import { Link, Outlet } from "react-router-dom";
import APIManager from "../../services/api";

const GestionPraticienTitulaire = () => {
  const [userData, setUserData] = useState([]);
  const [practiceData, setPracticeData] = useState([]);
  const [roomsPractice, setRoomsPractice] = useState([]);
  const [usersPractice, setUsersPractice] = useState([]);

  const getUserData = async () => {
    const { data } = await APIManager.memberData();
    setUserData(data.user);
    return data;
  };

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeData(data);
    setRoomsPractice(data.rooms);
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
          <div className="w-full h-auto">
            <div className="flex flex-col w-full h-auto border border-green rounded-xl p-2 shadow-lg">
              <h1 className="text-1xl font-bold leading-tight">
                {practiceData.name}
              </h1>
              <h1 className="text-1xl font-bold leading-tight">
                INFOS DU CABINET
              </h1>
              <p>{practiceData.adresse}</p>
              <p>{practiceData.email}</p>
              <button className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <Link to="modifier">Modifier</Link>
              </button>
            </div>
            <div className="flex flex-col w-full h-auto border border-green mt-10 rounded-xl p-2 shadow-lg">
              <h1 className="text-1xl font-bold leading-tight">MES SALLES</h1>
              <ul>

                { roomsPractice && roomsPractice.map((room) => (
                  <li key={room.id}>{room.name}</li>
                ))}
              </ul>
              <button className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <Link to="ajoutsalle">Ajouter une salle</Link>
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full h-full border border-green rounded-xl p-2 shadow-lg">
            <h1 className="text-1xl font-bold leading-tight">
              LES PRATICIENS DU CABINET
            </h1>
            { usersPractice && usersPractice.map((user) => (
                  <li key={user.id}>{user.email}</li>
                ))}
            <button className="self-end justify-self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <Link to="ajoutpraticien">Ajouter un praticien</Link>
            </button>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default GestionPraticienTitulaire;
