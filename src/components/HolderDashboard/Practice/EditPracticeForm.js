import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import APIManager from "../../../services/api";
import { currentUserAtom } from "../../../services/Atoms/currentUser";
import PracticeData from "./PracticeData";
import ReactDOM from "react-dom/client";

const EditPracticeForm = () => {
  const [practiceData, setPracticeData] = useState([]);
  const [userAtom] = useAtom(currentUserAtom);
  const userPracticeId = JSON.parse(userAtom).practice_id;

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeData(data);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.newName.value;
    const adresse = e.target.newAdresse.value;
    const email = e.target.newEmail.value;
    const id = userPracticeId;

    await APIManager.editPractice(id, name, adresse, email).catch((error) => {
      console.log(error.message);
    });

    const editPraticeRoot = ReactDOM.createRoot(
      document.getElementById("editPracticeDetails")
    );
    editPraticeRoot.render(
      <PracticeData name={name} adresse={adresse} email={email} />
    );
  };

  useEffect(() => {
    getPracticeData(userPracticeId);
  }, [userPracticeId]);

  return (
    <div id="editPracticeDetails">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="">
          <h1 className="text-1xl font-bold leading-tight">
            Modifications de vos informations:
          </h1>
          <div className="w-full mb-4">
            <div className="mb-4 h-1 gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div>
            <label htmlFor="practiceName" className="mr-1">
              <b>Nom du cabinet:</b>
            </label>
            <input type="text" id="newName" defaultValue={practiceData.name} />
          </div>
          <div>
            <label htmlFor="practiceAdress" className="mr-1">
              <b>Adresse :</b>
            </label>
            <input
              type="text"
              id="newAdresse"
              defaultValue={practiceData.adresse}
            />
          </div>
          <div>
            <label htmlFor="practiceEmail" className="mr-1">
              <b>Email :</b>
            </label>
            <input
              type="text"
              id="newEmail"
              defaultValue={practiceData.email}
            />
          </div>
        </div>
        <button className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default EditPracticeForm;
