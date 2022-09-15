import React from "react";
import { Link } from "react-router-dom";
import logoGreen from "../../assets/images/logoEpiGreenFondNone.png";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white">
        <div className="container mx-auto px-8">
          <div className="w-full flex flex-col md:flex-row py-6">
            <div className="flex-1 mb-6 text-black">
              <Link to="/" className="text-pink-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
                
                <img className="h-20 mt-6" src={logoGreen}></img>
              </Link>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Links</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <Link to="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">
                    FAQ
                  </Link>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <Link to="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">
                    Help
                  </Link>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <Link to="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Legal</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <Link to="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">
                    Terms
                  </Link>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <Link to="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Social</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <Link to="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">
                    Facebook
                  </Link>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <Link to="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">
                    Linkedin
                  </Link>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <Link to="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Company</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <Link to="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">
                    About Us
                  </Link>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <Link to="/" className="no-underline hover:underline text-gray-800 hover:text-orange-500">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
