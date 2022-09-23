import React, { useEffect, useState } from "react";
import APIManager from "../services/api";

import CalendarManager from "../components/Calendar/CalendarManager";
import { currentUserAtom } from "../services/Atoms/currentUser";
import { useAtom } from "jotai";

const Agenda = () => {
  const [agendaData, setAgendaData] = useState();
  const [practiceRoomsList, setPracticeRoomsList] = useState();

  const [text, setText] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [barColor, setBarColor] = useState("");
  const [resource, setResource] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const [newEvent, setNewEvent] = useState("");

  let [currentUser] = useAtom(currentUserAtom);
  currentUser = JSON.parse(currentUser);
  const practice_id = currentUser.practice_id;

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeRoomsList(data.rooms);
  };

  useEffect(() => {
    getPracticeData(practice_id);
  }, []);

  const getCurrentUserAgendaData = async () => {
    const { data } = await APIManager.agendaData();
    const currentUserData = data.filter(
      (data) => data.user_id === currentUser.id
    );
    setAgendaData(currentUserData);
    return currentUserData;
  };

  useEffect(() => {
    getCurrentUserAgendaData();
  }, [newEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("selectedRoom", selectedRoom);
    await APIManager.agendaCreate(
      text,
      start,
      end,
      barColor,
      resource,
      selectedRoom
    ).catch((error) => {
      alert("erreur");
      console.log(error.message);
    });
    setNewEvent(e);
  };

  if (agendaData === undefined) return <h1>LOADING ...</h1>;
  return (
    <div>
      <h1>Titre</h1>

      <CalendarManager eventList={agendaData} />

      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom de l'évent
                </label>
                <input
                  type="text"
                  id="text"
                  placeholder="RDV de ???"
                  className="focusForm mt-2 block w-full rounded-md border-2 border-gray-600 shadow-sm sm:text-sm"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-6 gap-6">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  StartingTime
                </label>
                <input
                  type="text"
                  id="Start"
                  placeholder="2022-09-16T11:30:00"
                  className="focusForm mt-2 block w-full rounded-md border-2 border-gray-600 shadow-sm sm:text-sm"
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-6 gap-6">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ending time
                </label>
                <input
                  type="text"
                  id="end"
                  placeholder="2022-09-16T14:30:00"
                  className="focusForm mt-2 block w-full rounded-md border-2 border-gray-600 shadow-sm sm:text-sm"
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-6 gap-6">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  BarColor
                </label>
                <input
                  type="text"
                  id="barColor"
                  placeholder="#6460aa"
                  className="focusForm mt-2 block w-full rounded-md border-2 border-gray-600 shadow-sm sm:text-sm"
                  onChange={(e) => setBarColor(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-6 gap-6">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Resource
                </label>
                <input
                  type="text"
                  id="resource"
                  placeholder="Th"
                  className="focusForm mt-2 block w-full rounded-md border-2 border-gray-600 shadow-sm sm:text-sm"
                  onChange={(e) => setResource(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-6 gap-6">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bureau
                </label>
                <select
                  className="select select-accent w-full max-w-xs"
                  onChange={(e) => setSelectedRoom(e.target.value)}
                >
                  <option disabled selected>
                    {" "}
                    choisir un bureau
                  </option>
                  {practiceRoomsList &&
                    practiceRoomsList.map((room, index) => (
                      <option key={index} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="ml-10 inline-flex justify-center hover:underline gradient text-white font-bold rounded-full my-3 py-2 px-5 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              >
                Valider
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Agenda;
