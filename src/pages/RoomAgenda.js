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
    console.log("selectedRoom au useEffect", selectedRoom);
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
      <h1>Les bureaux du Cabinet</h1>

      <select
        className="select select-accent w-full max-w-xs"
        onChange={handleChange}
      >
        <option disabled selected>
          {" "}
          choisir un bureau
        </option>
        {practiceRoomsList &&
          practiceRoomsList.map((room, index) => (
            <option key={index} value={room.id}>
              {room.name} {room.id}
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
