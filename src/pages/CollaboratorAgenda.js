import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import APIManager from "../services/api";
import { currentUserAtom } from "../services/Atoms/currentUser";
import { useAtom } from "jotai";
import CalendarDisplayer from "../components/Calendar/CalendarDisplayer";

const CollaboratorAgenda = () => {
  let [currentUser] = useAtom(currentUserAtom);
  currentUser = JSON.parse(currentUser);
  const practice_id = currentUser.practice_id;
  const [practiceUsersList, setPracticeUsersList] = useState();
  const [agendaData, setAgendaData] = useState();
  const [selectedUser, setSelectedUser] = useState();

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeUsersList(data.users);
  };

  const getCurrentUserAgendaData = async () => {
    const { data } = await APIManager.agendaData();
    const selectedUserData = data.filter(
      (data) => data.user_id === selectedUser
    );
    setAgendaData(selectedUserData);
    const collaboratorAgendaPage = ReactDOM.createRoot(
      document.getElementById("collaboratorAgendaPage")
    );
    collaboratorAgendaPage.render(<CalendarDisplayer eventList={agendaData} />);
    return selectedUserData;
  };

  useEffect(() => {
    getPracticeData(practice_id);
    getCurrentUserAgendaData();
    console.log("it run");
    console.log(agendaData);
  }, [selectedUser]);

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedUser(parseInt(e.target.value));
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
              <p>{user.email}</p>
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
