import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import APIManager from "../../../services/api";
import { currentUserAtom } from "../../../services/Atoms/currentUser";
import "./UserData.css";

const UserData = () => {
  const [userAtom] = useAtom(currentUserAtom);
  const practice_id = JSON.parse(userAtom).practice_id;
  const [usersPractice, setUsersPractice] = useState();
  const [newUser, setNewUser] = useState();

  const getUsersData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setUsersPractice(data.users);
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    const user_id = JSON.stringify(e.target.dataset.name).slice(1, 3);
    await APIManager.deleteUser(user_id);
    setNewUser(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const practice_id = JSON.parse(userAtom).practice_id;
    if (password !== confirmPassword) {
      document.getElementById("messages").innerHTML =
        "Les mots de passes doivent être identiques";
    } else {
      const response = await APIManager.registerUser(
        email,
        password,
        practice_id
      );
      setNewUser(e);
      console.log("User crée", response);
      document.getElementById("messages").innerHTML = "Compte practicien crée";
    }
  };
  const toggleButton = () => {
    const michel = document.getElementById("addUser");
    if (michel.style.display !== "block") {
      michel.style.display = "block";
    } else {
      michel.style.display = "none";
    }
  };
  useEffect(() => {
    getUsersData(practice_id);
  }, [newUser]);

  return (
    <div>
      <h1 className="text-1xl font-bold leading-tight">
        Les practiciens du cabinet:
      </h1>
      <div className="w-full mb-4">
        <div className="mb-10 h-1 gradient w-30 opacity-25 my-0 py-0 rounded-t"></div>
      </div>
      <ul>
        {usersPractice &&
          usersPractice.map((user, index) => (
            <div key={index}>
              <li className="flex flex-row flex-wrap justify-between mt-2">
                <p>{user.email}</p>
                <button data-name={user.id} onClick={deleteUser}>
                  ❌ Supprimer
                </button>
              </li>
              <hr className="mr-40 ml-40" />
            </div>
          ))}
      </ul>
      <button
        onClick={toggleButton}
        className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        Ajouter un practicien
      </button>

      <div id="addUser">
        <div className="ml-20 mr-20 mt-10 md:col-span-2 ">
          <form onSubmit={handleSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md border border-gray-300">
              <h1 className="mt-8 mb-5 pl-6 my-2 text-1xl font-bold leading-tight text-left text-gray-800">
                Créer un compte praticien :
              </h1>
              <span id="messages"></span>
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="userEmail"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="mt-1 block w-full rounded-md border-gray-900 shadow-sm focusForm mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="passwordUser"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="mt-1 block w-full focusForm mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="passwordConfirm"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="mt-1 block w-full focusForm mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    />
                  </div>
                  <button
                    onClick={toggleButton}
                    type="submit"
                    className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full  shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                  >
                    Ajouter un practicien
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserData;
