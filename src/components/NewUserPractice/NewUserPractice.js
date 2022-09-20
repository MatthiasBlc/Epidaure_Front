import React, { useEffect, useState } from "react";

import APIManager from "../../services/api";

const NewUserPratice = () => {
  const [userData, setUserData] = useState([]);
  const [practiceData, setPracticeData] = useState([]);
  const [roomsPractice, setRoomsPractice] = useState([]);
  const [usersPractice, setUsersPractice] = useState([]);

  const getUserData = async () => {
    const { data } = await APIManager.memberData();
    setUserData(data.user);
    console.log(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const practice_id = userData.practice_id;
    if (password !== confirmPassword) {
      document.getElementById("messages").innerHTML = "Les mots de passes doivent être identiques"
    } else {
      const response = await APIManager.registerUser(
        email,
        password,
        practice_id
      );
      console.log("User crée", response);
      document.getElementById("messages").innerHTML = "Compte practicien crée"
    }
  };


    return (
        <div>
            <div className="ml-20 mr-20 mt-20 md:col-span-2 ">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <h1 className="mt-8 mb-5 pl-6 my-2 text-1xl font-bold leading-tight text-left text-gray-800">
                  Créer un compte praticien :
                </h1>
                <span id="messages"></span>
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
                        id="confirmPassword"
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
    );
};

export default NewUserPratice;