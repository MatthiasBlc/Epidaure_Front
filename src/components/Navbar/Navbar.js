import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoWhite from "../../assets/images/logoEpiWhiteBgNone.png";
import { loggedAtom } from "../../services/Atoms/user";
import { useAtom } from "jotai";
import APIManager from "../../services/api";

const Navbar = ({ location }) => {
  const [logged, setLogged] = useAtom(loggedAtom);

  let activeStyle = {
    textDecoration: "underline",
    fontWeight: "bold",
  };

  const logout = async (e) => {
    e.preventDefault();
    await APIManager.logoutUser();
    setLogged(false);
  };

  // var navMenuDiv = document.getElementById("nav-content");
  // var navMenu = document.getElementById("nav-toggle");
  // var header = document.getElementById("header");
  // var navcontent = document.getElementById("nav-content");
  // var navaction = document.getElementById("navAction");
  // var brandname = document.getElementById("brandname");
  // var toToggle = document.querySelectorAll(".toggleColour");

  // document.onclick = check;
  // function check(e) {
  //   var target = (e && e.target) || (e && e.srcElement);

  //   //Nav Menu
  //   if (!checkParent(target, navMenuDiv)) {
  //     // click NOT on the menu
  //     if (checkParent(target, navMenu)) {
  //       // click on the link
  //       if (navMenuDiv.classList.contains("hidden")) {
  //         navMenuDiv.classList.remove("hidden");
  //       } else {
  //         navMenuDiv.classList.add("hidden");
  //       }
  //     } else {
  //       // click both outside link and outside menu, hide menu
  //       navMenuDiv.classList.add("hidden");
  //     }
  //   }
  // }
  // function checkParent(t, elm) {
  //   while (t.parentNode) {
  //     if (t === elm) {
  //       return true;
  //     }
  //     t = t.parentNode;
  //   }
  //   return false;
  // }

  return (
    <div>
      <nav id="header" className="w-full z-30 top-0 text-white gradient">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
          <div className="pl-4 flex items-center">
            <Link to={ logged ? "/dashboard" : "/"}>
              <img className="h-20" src={logoWhite}></img>
            </Link>
          </div>
          <div className="block lg:hidden pr-4">
            <button
              id="nav-toggle"
              className="flex items-center p-1 text-green hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              <svg
                className="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
            id="nav-content"
          >
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              {logged ? (
                <li className="mr-10">
                  <NavLink
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    to="/profile"
                  >
                    Profil
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
            {logged ? (
              <button
                onClick={logout}
                id="navAction"
                className="mx-auto lg:mx-0 hover:underline font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-100 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-white text-grey"
              >
                Se déconnecter
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button
                    id="navAction"
                    className="mx-auto lg:mx-0 hover:underline font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-100 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-white text-grey"
                  >
                    Connexion
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>
    </div>
  );
};

export default Navbar;
