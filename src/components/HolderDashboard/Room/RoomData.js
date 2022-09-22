import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import APIManager from "../../../services/api";
import { currentUserAtom } from "../../../services/Atoms/currentUser";
import AddRoomForm from "./AddRoomForm"
import EditRoomForm from "./EditRoomForm";
import Delete from "../../../assets/icons/delete.svg"
import Pencil from "../../../assets/icons/pencil.svg"

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
      <h1 className="text-1xl font-bold leading-tight">
        Les salles du cabinet:
      </h1>
      <div className="w-full mb-4">
        <div className="mb-10 h-1 gradient w-30 opacity-25 my-0 py-0 rounded-t"></div>
      </div>
      <ul>
        {roomsPractice &&
          roomsPractice.map((room) => (
            <div id={room.id} key={room.id}>
              <li
                className="flex flex-row flex-wrap justify-between mt-2"
              >
                <p>
                  Salle numéro {room.id} - {room.name}
                </p>
                <div className="flex">
                  <button data-name={room.id} onClick={editRoom}>
                  <img className="h-4 w-4" src={Pencil} alt="iconne modifier" />
                  </button>
                  <button
                    className="ml-2"
                    data-name={room.id}
                    onClick={deleteRoom}
                  >
                    <img className="h-5 w-5" src={Delete} alt="iconne supprimer" />
                  </button>
                </div>
              </li>
              <hr />
            </div>
          ))}
      </ul>
      <button
        onClick={addRoom}
        className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        Ajouter une salle
      </button>
      <div id="addRoom"></div>
    </div>
  );
};

export default RoomData;
