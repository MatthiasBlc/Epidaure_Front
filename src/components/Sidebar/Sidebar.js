import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faUserGroup, faGauge, faDoorClosed  } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";

const SideBar = () => {
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: faGauge },
    { name: "Mon planning", link: "planning", icon: faCalendarDays },
    { name: "Planning collaborateurs", link: "plancollab", icon: faUserGroup },
    { name: "Planning salles", link: "planrooms", icon: faDoorClosed }
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
            <div className="w-5 h-5 flex items-center justify-center"><FontAwesomeIcon size="xl" icon={menu?.icon}></FontAwesomeIcon></div>
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
