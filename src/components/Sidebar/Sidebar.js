import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import Gauge from "../../assets/icons/gauge.svg"
import Calendar from "../../assets/icons/calendar.svg"
import Group from "../../assets/icons/group.svg"
import Room from "../../assets/icons/room.svg"

const SideBar = () => {
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: Gauge },
    { name: "Mon planning", link: "planning", icon: Calendar },
    { name: "Planning collaborateurs", link: "plancollab", icon: Group },
    { name: "Planning salles", link: "planrooms", icon: Room }
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
            <img className="fill-white" src={menu?.icon} alt={`icon de ${menu?.icon}`} />
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
              } z-50 absolute left-48 bg-turquoise font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
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
