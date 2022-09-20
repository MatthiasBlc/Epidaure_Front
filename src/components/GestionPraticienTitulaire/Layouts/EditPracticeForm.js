import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import APIManager from "../../../services/api";
import { currentUserAtom } from "../../../services/Atoms/currentUser";

const EditPracticeForm = () => {
  const [practiceData, setPracticeData] = useState([]);
  const [userAtom] = useAtom(currentUserAtom);
  const userPracticeId = JSON.parse(userAtom).practice_id;

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeData(data);
    console.log(data);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.newName.value;
    const adresse = e.target.newAdresse.value;
    const email = e.target.newEmail.value;
    const id = userPracticeId;

    const data = await APIManager.editPractice(id, name, adresse, email)
    .catch(
      (error) => {
        console.log(error.message);
      }
    );

    window.location.reload();
};

  useEffect(() => {
    getPracticeData(userPracticeId);
  }, []);

  return (
     <div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="">
          <label className="mr-1">
            <b>Nom :</b>
          </label>
          <input type="text" id="newName" defaultValue={practiceData.name} />
          <label className="mr-1">
            <b>Email :</b>
          </label>
          <input type="text" id="newEmail" defaultValue={practiceData.email} />
          <label className="mr-1">
            <b>Adresse :</b>
          </label>
          <input
            type="text"
            id="newAdresse"
            defaultValue={practiceData.adresse}
          />
        </div>
        <button className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default EditPracticeForm;
