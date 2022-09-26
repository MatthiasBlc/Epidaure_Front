import React, { useEffect, useState } from "react";
import APIManager from "../services/api";
import { currentUserAtom } from "../services/Atoms/currentUser";
import { useAtom } from "jotai";

const Profil = () => {
  const [userData, setUserData] = useState({});
  const [practiceData, setPracticeData] = useState();
  const [_, setUserID] = useAtom(currentUserAtom);
  const [emailValue, setEmailValue] = useState();
  const [alertMsg, setAlertMsg] = useState();

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
    await setEmailValue(newEmail);
    await setUserID(JSON.stringify(data.user));
    setAlertMsg({type: "sucess2"})
    window.location.reload();
  };

  const passwordSubmit = async (e) => {
    e.preventDefault();
    await APIManager.forgotPasswordUser(userData.email).catch((error) => {
      console.log(error.message);
    });
    setAlertMsg({type: "sucess"})
  };

  useEffect(() => {
    getData();
  }, [emailValue]);

  if (practiceData === undefined) return <h1>Loading...</h1>;

  return (
    <>
      {alertMsg?.type === "sucess" && (
        <div className="alert alert-sucess bg-turquoise shadow-lg mt-2 mb-2">
          <div>
            <span>Un email vous a été envoyé avec les instructions.</span>
          </div>
        </div>
      )}
       {alertMsg?.type === "sucess2" && (
        <div className="alert alert-sucess bg-turquoise shadow-lg mt-2 mb-2">
          <div>
            <span>Votre adresse mail a été mise à jour.</span>
          </div>
        </div>
      )}
      <div className="pl-20 pr-20 pt-10">
        <div className="px-4 sm:px-0">
          <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            Informations personelles
          </h3>
        </div>
        <div>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cabinet
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
                    Statut
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
                    Adresse email
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
                  <form method="POST" onSubmit={handleSubmit}>
                    <div className=" mt-10">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Changez d'adresse mail
                      </label>
                      <input
                        type="text"
                        id="newEmail"
                        defaultValue={userData.email}
                        className="focusForm mt-1 mb-5 pt-1 pb-1 pl-1 pr-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 sm:text-sm"
                      />

                      <button
                        type="submit"
                        className="h-8 inline-flex justify-center hover:underline gradient text-white font-bold rounded-full py-1 px-5 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                      >
                        Editer mon adresse mail
                      </button>
                    </div>
                  </form>
                  <form method="POST" onSubmit={passwordSubmit}>
                    <div className="mt-5">
                      <button
                        type="submit"
                        className="inline-flex justify-center hover:underline gradient text-xs text-white font-bold rounded-full py-1 px-5 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                      >
                        Changer mon mot de passe
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-span-6 sm:col-span-3"></div>
              </div>
            </div>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
    </>
  );
};

export default Profil;
