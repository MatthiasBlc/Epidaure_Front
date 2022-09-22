import React, { useEffect, useState } from "react";
import APIManager from "../services/api";
import { currentUserAtom } from "../services/Atoms/currentUser";
import { useAtom } from "jotai";

const Profil = () => {
  const [userData, setUserData] = useState({});
  const [practiceData, setPracticeData] = useState();
  const [_, setUserID] = useAtom(currentUserAtom);

  const getUserData = async () => {
    const { data } = await APIManager.memberData();
    setUserData(data.user);
    return data;
  };

  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeData(data);
    return data;
  };

  const getData = async () => {
    const data = await getUserData();
    getPracticeData(data.user.practice_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmail = e.target.newEmail.value;

    const data = await APIManager.editUser(newEmail).catch((error) => {
      console.log(error.message);
    });
    document.getElementById("emailUser").innerHTML = data.email;
    setUserID(JSON.stringify(data.user));
  };

  const passwordSubmit = async (e) => {
    e.preventDefault();
    await APIManager.forgotPasswordUser(userData.email).catch((error) => {
      console.log(error.message);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  if (practiceData === undefined) return <h1>Loading...</h1>;

  return (
    <div className="pl-20 pr-20 pt-10">
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Informations personelles
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          This page lists all your personal information, you can edit your mail
          and ask for a reset password. Voici toutes les informatiions liées à
          votre compte, vous pouvez éditer mon email ainsi que faire une pour un
          nouveau mot de passe.
        </p>
      </div>
      <div>
        <form action="#" method="POST">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your practice
                  </label>
                  <span
                    type="text"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {practiceData.name}
                  </span>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your status
                  </label>
                  <span
                    type="text"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {userData.status}
                  </span>
                </div>

                <div className="col-span-6 sm:col-span-4 mt-2 mb-2">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your email address
                  </label>
                  <span
                    type="text"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {userData.email}
                  </span>
                </div>
                <div className="col-span-6 sm:col-span-3 mr-6 mt-3">
                  <hr />
                  <form method="POST" onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-gray-700">
                      Changez d'adresse mail
                    </label>
                    <input
                      type="text"
                      id="newEmail"
                      defaultValue={userData.email}
                      className="mt-1 mb-5 pt-1 pb-1 pl-1 pr-1 block w-full rounded-md bg-gray-300 border-gray-300 shadow-sm focus:border-indigo-500 sm:text-sm"
                    />
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Editer
                    </button>
                  </form>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <form method="POST" onSubmit={passwordSubmit}>
                    <label className="block pb-3 text-sm font-medium text-gray-700">
                      Réinitialiser mon mot de passe
                    </label>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      M'envoyer un mail
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profil;
