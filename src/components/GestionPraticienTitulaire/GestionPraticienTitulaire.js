import React from "react";

const GestionPraticienTitulaire = () => {
  return (
    <div className="w-full">
      <div className="w-full flex-column">
        <h2 className="mt-8 my-2 text-1xl font-bold leading-tight text-left text-gray-800">
          Gestion praticien titulaire
        </h2>
        <div className="w-full mb-4">
          <div className="mb-10 h-1 gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="containerGrid1 mr-4 h-auto">
          <div className="w-full h-auto">
            <div className="flex flex-col w-full h-auto bg-orange rounded-xl p-2 shadow-lg">
              <h1 className="text-1xl font-bold leading-tight">
                NOM DU CABINET
              </h1>
              <h1 className="text-1xl font-bold leading-tight">
                INFOS DU CABINET
              </h1>
              <p>Info 1</p>
              <p>Info 2</p>
              <p>Info 3</p>
              <p>Info 4</p>
              <button className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Modifier
              </button>
            </div>
            <div className="flex flex-col w-full h-auto bg-orange mt-10 rounded-xl p-2 shadow-lg">
              <h1 className="text-1xl font-bold leading-tight">MES SALLES</h1>
              <p>Salle 1</p>
              <p>Salle 2</p>
              <p>Salle 3</p>
              <p>Salle 4</p>
              <p>Salle 5</p>
              <button className="self-end mt-4 mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Ajouter une salle
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full h-full bg-orange rounded-xl p-2 shadow-lg">
            <h1 className="text-1xl font-bold leading-tight">
              LES PRATICIENS DU CABINET
            </h1>
            <p>Praticien 1</p>
              <p>Praticien</p>
              <p>Praticien</p>
              <p>Praticien</p>
              <p>Praticien</p>
            <button className="self-end justify-self-end mt-4 mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-2 py-1 px-4 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Ajouter un praticien
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionPraticienTitulaire;
