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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const practice_id = userData.practice_id;
    const response = await APIManager.registerUser(
      email,
      password,
      practice_id
    );
    console.log("User crée", response);
  };

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
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <h1 className="mt-8 mb-5 pl-6 my-2 text-1xl font-bold leading-tight text-left text-gray-800">
                  Créer un compte praticien :
                </h1>
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focusForm mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="mt-1 block w-full focusForm mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Confirmer le mot de passe
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="mt-1 block w-full focusForm mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="ml-10 inline-flex justify-center hover:underline gradient text-white font-bold rounded-full my-3 py-2 px-5 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                  >
                    Valider
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
