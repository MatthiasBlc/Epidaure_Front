import React from "react";
import APIManager from "../../../services/api";

const EditRoomForm = (id) => {
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.newName.value;
    await APIManager.editRoom(id.id,name).catch((error) => {
      console.log(error.message);
    });
    window.location.reload();
  };

  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="">
          <label className="mr-1">
            <b>Nom :</b>
          </label>
          <input type="text" id="newName" placeholder={id.name}/>
          <button className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoomForm;
