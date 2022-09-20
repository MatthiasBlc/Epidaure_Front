import React, { useState } from "react";
import { GoDashboard, GoPerson } from "react-icons/go";
import { BiMenuAltLeft, BiSun } from "react-icons/bi";
import { MdOutlinePeopleAlt, MdOutlineSensorDoor } from "react-icons/md";

import { Link } from "react-router-dom";

const SideBar = () => {
  const menus = [
    { name: "Gestion praticien titulaire", link: "/dashboard", icon: GoDashboard },
    { name: "Planning collaborateurs", link: "plancollab", icon: MdOutlinePeopleAlt},
    { name: "Planning salles", link: "planrooms", icon: MdOutlineSensorDoor },
    { name: "Gérer mon planning", link: "planning", icon: GoPerson },
    { name: "(Module Vacances?)", link: "/", icon: BiSun },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-green min-h-screen pt-5 ${
        open ? "w-72" : "w-16"
      } duration-500 text-white px-4`}
    >
      <div className="py-3 flex justify-end">
        <BiMenuAltLeft
          size={26}
          className="cursor-pointer mb-6"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-turquoise rounded-md"
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-darkgrey rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
