import React from "react";
import { Link } from "react-router-dom";
import logoGreen from "../../../assets/images/logoEpiGreenFondNone.png";

const teams = [
  { name: "MatthiasBlc", link: "https://github.com/MatthiasBlc" },
  { name: "Lxvia", link: "https://github.com/Lxvia" },
  { name: "enzostk", link: "https://github.com/enzostk" },
];

const Footer = () => {
  return (
    <div>
      <footer className="bg-white">
        <div className="container mx-auto px-8">
          <div className="w-full flex flex-col md:flex-row py-6">
            <div className="flex-1 mb-6 text-black">
              <img
                className="h-20 mt-6"
                src={logoGreen}
                alt="logo-footer-epidaure"
              />
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Mentions légales</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <Link
                    to="/privacy"
                    className="no-underline hover:underline text-gray-800 hover:text-orange-500"
                  >
                    Politique de confidentialité
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Equipe</p>
              <ul className="list-reset mb-6">
                {teams &&
                  teams.map((team, k) => (
                    <li
                      key={k}
                      className="mt-2 inline-block mr-2 md:block md:mr-0"
                    >
                      <a
                        href={team.link}
                        className="no-underline hover:underline text-gray-800 hover:text-orange-500"
                      >
                        {team.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
