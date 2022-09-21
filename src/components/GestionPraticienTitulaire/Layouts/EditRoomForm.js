import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import APIManager from "../../../services/api";
import { currentUserAtom } from "../../../services/Atoms/currentUser";

const EditRoomForm = (id) => {
  const [, setRoomsPractice] = useState([]);
  const [userAtom] = useAtom(currentUserAtom);
  const userPracticeId = JSON.parse(userAtom).practice_id;

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setRoomsPractice(data.rooms);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.newName.value;
    await APIManager.editRoom(id.id,name).catch((error) => {
      console.log(error.message);
    });
    window.location.reload();
  };

  useEffect(() => {
    getPracticeData(userPracticeId);
  }, [userPracticeId]);

  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="">
          <label className="mr-1">
            <b>Nom :</b>
          </label>
          <input type="text" id="newName" placeholder={id.id.name} />
          <button className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoomForm;
