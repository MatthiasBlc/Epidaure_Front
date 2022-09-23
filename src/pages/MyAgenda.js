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
      <h1>Titre</h1>

      <CalendarManager eventList={agendaData} />
    </div>
  );
};

export default Agenda;
