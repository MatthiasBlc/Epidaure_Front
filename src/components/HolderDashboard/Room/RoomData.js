import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import APIManager from "../../../services/api";
import { currentUserAtom } from "../../../services/Atoms/currentUser";
import "./RoomData.css";

const RoomData = () => {
  const [userAtom] = useAtom(currentUserAtom);
  const practice_id = JSON.parse(userAtom).practice_id;
  const [roomsPractice, setRoomsPractice] = useState([]);
  const [alertMsg, setAlertMsg] = useState(undefined);
  const roomPracticeId = JSON.parse(userAtom).practice_id;
  const [newRoom, setNewRoom] = useState();
  const [deleteRooms, setDeleteRoom] = useState();
  const [editRoomList, setEditRoomList] = useState();
  const [editRoomID, setEditRoomID] = useState();

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setRoomsPractice(data.rooms);
    return data;
  };

  const deleteRoom = async (e) => {
    e.preventDefault();
    const room_id = JSON.stringify(e.target.dataset.name).slice(1, 3);
    await APIManager.deleteRoom(room_id).catch((error) => {
      console.log(error.message);
    });
    setDeleteRoom(e);
  };

  // const editRoomFunction = async (e) => {
  //   e.preventDefault();
  //   console.log(editRoomID);
  //   // const name = e.target.newName.value;
  //   // await APIManager.editRoom(editRoomID,name).catch((error) => {
  //   //   console.log(error.message);
  //   // });
  //   // setEditRoomList(e);
  // };

  const createRoom = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (name === "") {
      setAlertMsg({ type: "error" });
    } else {
      await APIManager.createRoom(roomPracticeId, name).catch((error) => {
        console.log(error.message);
      });
      setNewRoom(e);
      document.getElementById("addRoom").style.display = "none";
    }
  };

  const addRoomButton = () => {
    const addRoomDiv = document.getElementById("addRoom");
    if (addRoomDiv.style.display !== "block") {
      addRoomDiv.style.display = "block";
    }
  };

  // const editRoomButton = (e) => {
  //   e.preventDefault();
  //   const roomID = e.target.dataset.name;
  //   setEditRoomID(roomID);
  //   console.log(roomID);
  //   const editRoomDiv = document.getElementById("editRoom");
  //   if (editRoomDiv.style.display !== "block") {
  //     editRoomDiv.style.display = "block";
  //   } else {
  //     editRoomDiv.style.display = "none";
  //   }
  // };

  useEffect(() => {
    getPracticeData(practice_id);
  }, [newRoom, deleteRooms, editRoomList]);

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
              <li className="flex flex-row flex-wrap justify-between mt-2">
                <p>
                  Salle {room.id} - {room.name}
                </p>
                <div>
                  {/* <button data-name={room.id} onClick={editRoomButton}>
                    ✎ Modifier
                  </button> */}
                  <button
                    className="ml-2"
                    data-name={room.id}
                    onClick={deleteRoom}
                  >
                    ❌ Supprimer
                  </button>
                </div>
              </li>
              <hr />
            </div>
          ))}
      </ul>
      <button
        onClick={addRoomButton}
        className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        Ajouter une salle
      </button>
      <>
        {alertMsg?.type === "error" && (
          <div className="alert alert-error shadow-lg mt-2 mb-2">
            <div>
              <span>Le nom de la salle ne peut pas être vide.</span>
            </div>
          </div>
        )}
        <div id="addRoom">
          <div>
            <form method="POST" onSubmit={createRoom}>
              <div className="">
                <label htmlFor="roomName" className="mr-1">
                  <b>Nom de la salle à ajouter:</b>
                </label>
                <input type="text" id="name" />
              </div>
              <button
                onClick={addRoomButton}
                className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
        {/* <div id="editRoom">
          <form method="POST" onSubmit={editRoomFunction}>
            <div>
              <label htmlFor="roomName" className="mr-1">
                <b>Nouveau nom de la salle:</b>
              </label>
              <input type="text" id="newName" className="mr-2" />
              <button
                onClick={editRoomButton}
                className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </div> */}
      </>
    </div>
  );
};

export default RoomData;
