import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSetAtom } from "jotai";
import { loggedAtom } from "../../services/Atoms/user";
import { currentUserAtom } from "../../services/Atoms/currentUser";

import APIManager from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logged = useSetAtom(loggedAtom);
  const userID = useSetAtom(currentUserAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await APIManager.loginUser(email, password).catch(
      (error) => {
        alert("erreur");
        console.log(error.message);
      }
    );
    logged(true);
    userID(JSON.stringify(response.user));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/users/password">MDP</Link>
    </>
  );
};

export default Login;
