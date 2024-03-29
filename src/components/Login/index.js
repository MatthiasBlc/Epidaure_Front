import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../services/Atoms/currentUser";
import APIManager from "../../services/api";
import { loggedAtom } from "../../services/Atoms/user";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, setUserID] = useAtom(currentUserAtom);
  const [, setLogged] = useAtom(loggedAtom);
  const [alertMsg, setAlertMsg] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await APIManager.loginUser(email, password).catch(
      (error) => {
        console.log(error.message);
        setAlertMsg({ type: "error", error });
      }
    );
    setUserID(JSON.stringify(response.user));
    setLogged(true);
    navigate("/dashboard");
  };

  return (
    <>
      {alertMsg?.type === "error" && (
        <div className="alert alert-error shadow-lg mt-2">
          <div>
            <span>Email ou mot de passe incorrects.</span>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center">
        <div className="mt-20">
          <h2 className="my-2 text-3xl font-bold leading-tight text-center text-gray-800">
            Se connecter
          </h2>
          <div className="w-full mb-4">
            <div className="mb-10 h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Adresse email
                      </label>
                      <input
                        type="text"
                        id="email"
                        className="focusForm mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="focusForm mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <Link
                    to="/users/password"
                    className="text-sm hover:underline hover:text-orange"
                  >
                    Mot de passe oublié
                  </Link>
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
      </div>
    </>
  );
};

export default Login;
