import React, { useEffect, useState } from "react";
import APIManager from "../services/api";

import CalendarManager from "../components/Calendar/CalendarManager";
import { currentUserAtom } from "../services/Atoms/currentUser";
import { useAtom } from "jotai";

const Agenda = () => {
  const [agendaData, setAgendaData] = useState();

  let [currentUser] = useAtom(currentUserAtom);
  currentUser = JSON.parse(currentUser);

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
  }, []);

  if (agendaData === undefined) return <h1>LOADING ...</h1>;
  return (
    <div>
      <h2 className="mt-8 my-2 text-1xl font-bold leading-tight text-left text-gray-800">
        Mon planning
      </h2>
      <div className="w-full mb-4">
        <div className="mb-10 h-1 gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
      </div>

      <CalendarManager eventList={agendaData} />
    </div>
  );
};

export default Agenda;
