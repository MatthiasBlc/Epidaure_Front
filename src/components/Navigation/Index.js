import React from "react";
import { NavLink } from "react-router-dom";
import { useAtom } from "jotai";
import { loggedAtom } from "../../services/Atoms/user";
import APIManager from "../../services/api";

function Navigation(props) {
  const [logged, setLogged] = useAtom(loggedAtom);

  let activeStyle = {
    textDecoration: "underline",
  };

  const logout = async (e) => {
    e.preventDefault();
    await APIManager.logoutUser();
    setLogged(false);
  };

  return (
    <div>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to="/profile"
      >
        Profile
      </NavLink>

      {logged ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/signup"
          >
            Signup
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/login"
          >
            Login
          </NavLink>
        </>
      )}
    </div>
  );
}

export default Navigation;
