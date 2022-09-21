import React, { useEffect, useState } from "react";
import APIManager from "../services/api";

import Calendar from "../components/Calendar/Calendar";

const Agenda = () => {
  const [agendaData, setAgendaData] = useState();

  const [text, setText] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [barColor, setBarColor] = useState("");
  const [resource, setResource] = useState("");

  const getAgendaData = async () => {
    const { data } = await APIManager.agendaData();
    setAgendaData(data);
    return data;
  };

  useEffect(() => {
    getAgendaData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await APIManager.agendaCreate(text, start, end, barColor, resource).catch(
      (error) => {
        alert("erreur");
        console.log(error.message);
        getAgendaData();
        // semble ne pas s'actualiser ?
      }
    );
  };

  if (agendaData === undefined) return <h1>LOADING ...</h1>;
  // console.log(agendaData);
  return (
    <div>
      <h1>Titre</h1>
      <p>
        La page d'accueil doit montrer un lien pour se signup et un lien pour se
        signin si la personne parcourant le site n'est pas connectée. Si elle
        est connectée, le lien pour se logout doit être affiché à la place.
      </p>
      <Calendar eventList={agendaData} />

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
