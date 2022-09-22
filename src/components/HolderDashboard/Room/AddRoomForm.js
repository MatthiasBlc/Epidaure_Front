import { useAtom } from "jotai";
import React, { useState } from "react";
import APIManager from "../../../services/api";
import { currentUserAtom } from "../../../services/Atoms/currentUser";

const AddRoomForm = () => {
  const [userAtom] = useAtom(currentUserAtom);
  const roomPracticeId = JSON.parse(userAtom).practice_id;
  const [alertMsg, setAlertMsg] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    name === ""
      ? setAlertMsg({ type: "error" })
      : await APIManager.createRoom(roomPracticeId, name).catch((error) => {
          console.log(error.message);
        })
        window.location.reload();
        ;
  };
  return (
    <>
      {alertMsg?.type === "error" && (
        <div className="alert alert-error shadow-lg mt-2 mb-2">
          <div>
            <span>Le nom de la salle ne peut pas être vide.</span>
          </div>
        </div>
      )}
      <div>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="">
            <label className="mr-1">
              <b>Nom de la salle:</b>
            </label>
            <input type="text" id="name" />
          </div>
          <button className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
           Ajouter
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRoomForm;
