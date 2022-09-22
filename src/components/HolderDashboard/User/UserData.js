import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import APIManager from "../../../services/api";
import { currentUserAtom } from "../../../services/Atoms/currentUser";
import AddPracticeUser from "./AddPracticeUser";
import ReactDOM from "react-dom/client";

const UserData = () => {
  const [userAtom] = useAtom(currentUserAtom)
  const practice_id = JSON.parse(userAtom).practice_id;
  const [usersPractice, setUsersPractice] = useState();

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setUsersPractice(data.users);
  };
  
  useEffect(() => {
    getPracticeData(practice_id);
  }, [practice_id]);

  const deleteUser = async (e) => {
    e.preventDefault();
    const user_id = JSON.stringify(e.target.dataset.name).slice(1, 3);
    await APIManager.deleteUser(user_id);
  };

  const addUser = () => {
    const roomRoot = ReactDOM.createRoot(document.getElementById("addUser"));
    roomRoot.render(<AddPracticeUser />);
  };

  const toggleButton = () => {
    const button = document.getElementById('buttonAddUser');
    if (button.style.display = "block") { 
      button.style.display = "none" } 
  }

  const addUserAndToggle = () => {
    addUser();
    toggleButton();    
  }

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
          usersPractice.map((user,index) => (
            <div key={index}>
              <li
                className="flex flex-row flex-wrap justify-between mt-2"
              >
                <p>{user.email}</p>
                <button data-name={user.id} onClick={deleteUser}>
                  ❌ Supprimer
                </button>
              </li>
              <hr className="mr-40 ml-40"/>
            </div>
          ))}
      </ul>
      <button id="buttonAddUser" onClick={addUserAndToggle} className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
        Ajouter un practicien
      </button>
      <div id="addUser"></div>
    </div>
  );
};

export default UserData;
