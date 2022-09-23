import React from "react";
import ReactDOM from "react-dom/client";
import EditPracticeForm from "./EditPracticeForm";
import { currentUserAtom } from "../../../services/Atoms/currentUser";
import { useAtom } from "jotai";

const PracticeData = (practice) => {
  let [currentUser] = useAtom(currentUserAtom);
  currentUser = JSON.parse(currentUser);
  const userStatus = currentUser.status;

  const PracticeDetails = () => {
    const praticeRoot = ReactDOM.createRoot(
      document.getElementById("practiceDetails")
    );
    praticeRoot.render(<EditPracticeForm />);
  };

  return (
    <div id="practiceDetails">
      <h1 className="text-1xl font-bold leading-tight">
        Informations du cabinet: {practice.name}
      </h1>
      <div className="w-full mb-4">
        <div className="mb-6 h-1 gradient w-30 opacity-25 my-0 py-0 rounded-t"></div>
      </div>
      <p>
        <b>Adresse:</b> {practice.adresse}
      </p>
      <p>
        <b>Mail:</b> {practice.email}
      </p>
      { userStatus === "holder" && <button
        onClick={PracticeDetails}
        className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        Modifier les informations
      </button> }
    </div>
  );
};

export default PracticeData;
