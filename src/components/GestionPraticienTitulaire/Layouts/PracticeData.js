import React from "react";
import ReactDOM from "react-dom/client";
import EditPracticeForm from "./EditPracticeForm";

const PracticeData = (data) => {
  const PracticeDetails = () => {
    const praticeRoot = ReactDOM.createRoot(
      document.getElementById("practiceDetails")
    );
    praticeRoot.render(<EditPracticeForm />);
  };

  return (
    <div id="practiceDetails">
      <h1 className="text-1xl font-bold leading-tight">INFOS DU CABINET {data.name}</h1>
      <p>{data.adresse}</p>
      <p>{data.email}</p>
      <button
        onClick={PracticeDetails}
        className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-lightgrey text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        Modifier
      </button>
    </div>
  );
};

export default PracticeData;
