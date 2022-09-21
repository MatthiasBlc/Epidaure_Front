import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import APIManager from "../../../services/api";
import { currentUserAtom } from "../../../services/Atoms/currentUser";
import AddRoomForm from "./AddRoomForm";
import EditRoomForm from "./EditRoomForm";

const RoomData = () => {

  const [userAtom] = useAtom(currentUserAtom);
  const practice_id = JSON.parse(userAtom).practice_id;
  const [roomsPractice, setRoomsPractice] = useState([]);

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setRoomsPractice(data.rooms);
    return data;
  };

  const addRoom = () => {
    const roomRoot = ReactDOM.createRoot(document.getElementById("addRoom"));
    roomRoot.render(<AddRoomForm />);
  };

  const deleteRoom = async (e) => {
    e.preventDefault();
    const room_id = JSON.stringify(e.target.dataset.name).slice(1, 3);
    await APIManager.deleteRoom(room_id);
    window.location.reload();
  };

  const editRoom = async (e) => {
    e.preventDefault();
    const room_id = e.target.dataset.name;
    const editRoomRoot = ReactDOM.createRoot(document.getElementById(room_id));
    editRoomRoot.render(<EditRoomForm id={room_id} />);
  };

  useEffect(() => {
    getPracticeData(practice_id);
  }, [practice_id]);
  
  return (
    <div>
      <div id="addRoom"></div>
      <h1 className="text-1xl font-bold leading-tight">MES SALLES</h1>
      <ul>
        {roomsPractice &&
          roomsPractice.map((room) => (
            <>
              <div id={room.id}>
                <li key={room.id}>{room.name}</li>
                <button data-name={room.id} onClick={deleteRoom}>
                  ❌
                </button>
                <button data-name={room.id} onClick={editRoom}>
                  ✎
                </button>
              </div>
            </>
          ))}
      </ul>
      <button
        onClick={addRoom}
        className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        Ajouter une salle
      </button>
    </div>
  );
};

export default RoomData;
