import React, { useEffect, useState } from "react";
import APIManager from "../services/api";
import { currentUserAtom } from "../services/Atoms/currentUser";
import { useAtom } from "jotai";
import CalendarDisplayer from "../components/Calendar/CalendarDisplayer";

const CollaboratorAgenda = () => {
  let [currentUser] = useAtom(currentUserAtom);
  currentUser = JSON.parse(currentUser);
  const practice_id = currentUser.practice_id;
  const [agendaData, setAgendaData] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [practiceUsersList, setPracticeUsersList] = useState();
  const [userListAgendaData, setUserListAgendaData] = useState([]);

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeUsersList(data.users);
  };

  const getUserListAgendaData = async () => {
    const { data } = await APIManager.agendaData();
    setUserListAgendaData(data);
  };

  useEffect(() => {
    getPracticeData(practice_id);
    getUserListAgendaData();
  }, []);

  const getSelectedUserAgendaData = (User) => {
    const selectedUserAgendaData = userListAgendaData.filter(
      (data) => data.user_id === User
    );
    setAgendaData(selectedUserAgendaData);
  };

  useEffect(() => {
    getSelectedUserAgendaData(selectedUser);
  }, [selectedUser]);

  const handleChange = (e) => {
    e.preventDefault();
    const parseUserValue = parseInt(e.target.value);
    setSelectedUser(parseUserValue);
  };

  if (agendaData === undefined) return <h1>LOADING ...</h1>;
  return (
    <div>
      <h1>Mes collaborateurs</h1>

      <select
        className="select select-accent w-full max-w-xs"
        onChange={handleChange}
      >
        <option disabled selected>
          {" "}
          choisir un collaborateur
        </option>
        {practiceUsersList &&
          practiceUsersList.map((user, index) => (
            <option key={index} value={user.id}>
              {user.email} {user.id}
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

export default CollaboratorAgenda;
