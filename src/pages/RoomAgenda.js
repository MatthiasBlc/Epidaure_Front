import React, { useEffect, useReducer, useState } from "react";
import APIManager from "../services/api";
import CalendarDisplayer from "../components/Calendar/CalendarDisplayer";
import { currentUserAtom } from "../services/Atoms/currentUser";
import { useAtom } from "jotai";

const RoomAgenda = () => {
  let [currentUser] = useAtom(currentUserAtom);
  currentUser = JSON.parse(currentUser);
  const practice_id = currentUser.practice_id;
  const [agendaData, setAgendaData] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [practiceRoomsList, setPracticeRoomsList] = useState();
  const [roomListAgendaData, setRoomListAgendaData] = useState([]);

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeRoomsList(data.rooms);
  };

  const getRoomListAgendaData = async () => {
    const { data } = await APIManager.agendaData();
    setRoomListAgendaData(data);
  };

  useEffect(() => {
    getPracticeData(practice_id);
    getRoomListAgendaData();
  }, []);

  const getSelectedRoomAgendaData = (Room) => {
    const selectedRoomAgendaData = roomListAgendaData.filter(
      (data) => data.room_id === Room
    );
    setAgendaData(selectedRoomAgendaData);
  };

  useEffect(() => {
    getSelectedRoomAgendaData(selectedRoom);
  }, [selectedRoom]);

  const handleChange = (e) => {
    e.preventDefault();
    const parseRoomValue = parseInt(e.target.value);
    setSelectedRoom(parseRoomValue);
  };

  if (agendaData === undefined) return <h1>LOADING ...</h1>;
  return (
    <div>
      <h2 className="mt-8 my-2 text-1xl font-bold leading-tight text-left text-gray-800">
          Planning des salles
        </h2>
        <div className="w-full mb-4">
          <div className="mb-5 h-1 gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
      <select
        className="select select-accent w-full max-w-xs"
        onChange={handleChange}
      >
        <option disabled selected>
          {" "}
          Choisir un bureau
        </option>
        {practiceRoomsList &&
          practiceRoomsList.map((room, index) => (
            <option key={index} value={room.id}>
              {room.name}
            </option>
          ))}
      </select>
      <br />
      <br />
      <div id="collaboratorAgendaPage">
        <CalendarDisplayer eventList={agendaData} />
      </div>
    </div>
  );
};

export default RoomAgenda;
