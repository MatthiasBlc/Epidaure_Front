import React from "react";
import { useAtom } from "jotai";
import { Link, Navigate } from "react-router-dom";
import { loggedAtom } from "../../services/Atoms/user";
import Footer from "../../components/Footer/Footer";
import createAccountLogo from "../../assets/images/createAccountLogo.png";
import Dashboard from "../../assets/images/Dashboard.png";
import Planning from "../../assets/images/planning.png";
import SVG1 from "./svg/SVG1";
import SVG0 from "./svg/SVG0";

const Home = () => {
  const freeFeatures = [
    "Gestion de votre cabinet",
    "Création des comptes collaborateurs",
    "Gestion des plannings du personnel",
  ];
  const paidFeatures = [
    "Gestion de votre cabinet",
    "Création des comptes collaborateurs",
    "Gestion des plannings du personnel",
    "Carnet de contact professionel partagé",
    "Gestion de liste d'attente de patients",
  ];

  const [logged] = useAtom(loggedAtom);
  if (logged !== undefined) return <Navigate to="/dashboard" replace={true} />;

  return (
    <>
      <div className="leading-normal tracking-normal text-white gradient">
        <div className="pt-24">
          {/* <!-- Section 1 --> */}
          <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            {/* <!--Left Col--> */}
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <p id="pHome1" className="text-1xl tracking-loose w-full">
                APPLICATION DE GESTION POUR VOTRE CABINET MEDICAL
              </p>
              <h1 className="mb-6 text-5xl font-bold leading-tight">
                Pour votre confort, par nos services
              </h1>
              <p className="leading-normal text-1xl mb-8">
                Epidaure est une application destinée au domaine médical qui
                permet aux practiciens d'un même cabinet de partager et de gérer
                facilement leurs emplois du temps grâce à un système de
                calendrier simple et efficace.
              </p>
              <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                <Link to="/contact">En savoir plus</Link>
              </button>
            </div>
            {/* <!--Right Col--> */}
            <div className="w-full md:w-3/5 py-6 text-center">
              <img className="w-full md:w-4/5 z-50" src="hero.png" alt="hero" />
            </div>
          </div>
        </div>

        {/* <!-- Separator 1 --> */}
        <SVG0 />
        {/* <!-- Section 1 --> */}
        
        <section id="abc" className="bg-white border-b py-8 pb-20">
          <div className="container max-w-5xl mx-auto m-8">
            <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
              Notre application
            </h2>
            <div className="w-full mb-20">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-5/6 sm:w-1/3 p-6">
                <h3 className="text-2xl text-gray-800 font-bold leading-none mb-3">
                  Création d'un compte titulaire
                </h3>
                <p className="text-gray-600 mb-8">
                  Demandez votre compte titulaire à notre équipe. Celui-ci
                  pourra à son tour, créer des comptes pour les{" "}
                  <b className="text-orange">collaborateurs</b> du cabinet.
                </p>
              </div>
              <div className="w-full sm:w-2/3 p-6">
                <img className="shadow-lg shadow-gray-200" src={createAccountLogo} />
              </div>
            </div>
            <div className="flex flex-wrap flex-col-reverse sm:flex-row mt-20">
              <div className="w-full sm:w-2/3 p-6 mt-6">
                <img className="shadow-lg shadow-gray-200" src={Dashboard} />
              </div>
              <div className="w-full sm:w-1/3 p-6 mt-6">
                <div className="align-middle">
                  <h3 className="text-2xl text-gray-800 font-bold leading-none mb-3">
                    Ajout des données de votre cabinet
                  </h3>
                  <p className="text-gray-600 mb-8">
                    L'espace titulaire vous permet de consulter et de gérer
                    directement les informations liées à votre <b className="text-orange">cabinet</b>{" "}
                    (Collaborateurs, bureaux, données du cabinet.. )
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mt-20">
              <div className="w-5/6 sm:w-1/3 p-6">
                <h3 className="text-2xl text-gray-800 font-bold leading-none mb-3">
                  Gestion des plannings
                </h3>
                <p className="text-gray-600 mb-8">
                  Notre outil de <b className="text-orange">plannings</b> vous permettra de connaître à
                  chaque moment de la journée l'utilisation des différents
                  salles de votre cabinet et les agendas de vos collaborateurs,
                  ainsi que des les modifier.
                  <br></br>
                </p>
              </div>
              <div className="w-full sm:w-2/3 p-6">
                <img className="shadow-lg shadow-gray-200" src={Planning} />
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Section 2: Pricing --> */}
        <section className="bg-gray-100 py-8">
          <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
            <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
              Nos tarifs
            </h2>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
              <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                  <div className="w-full p-8 text-2xl font-bold text-center">
                    Version Standard
                  </div>
                  <div className="h-1 w-full gradient my-0 py-0 rounded-t"></div>
                  <ul className="w-full text-center text-base font-bold">
                    {freeFeatures.map((freeFeature, i) => (
                      <li key={i} className="border-b py-4">
                        {freeFeature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
                <div className="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
                  <div className="p-8 text-2xl font-bold text-center border-b-4">
                    Version Prenium
                  </div>
                  <ul className="w-full text-center text-sm">
                    {paidFeatures.map((paidFeature, i) => (
                      <li key={i} className="border-b py-4">
                        {paidFeature}
                      </li>
                    ))}
                  </ul>
                  <button
                    disabled
                    type="button"
                    className="py-2 px-4 w-full text-center font-medium text-left bg-gray-100 rounded-b-lg cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                  >
                    Prochainement
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
            <button className="lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <Link to="/contact">Pour plus d'informations, contactez-nous!</Link>
            </button>
            </div>
          </div>
        </section>
        <SVG1 />
        {/* <!-- Change the colour #f8fafc to match the previous section colour -->
        <
    <!-- Separator 2 --> */}
        {/* <!-- Hero 2 --> */}
        <section className="container mx-auto text-center py-6 mb-12">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
            Vous souhaitez en savoir plus?
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <h3 className="my-4 text-2xl leading-tight">
            N'hésitez pas à nous contacter, nous ferons un plaisir de vous
            répondre!
          </h3>
          <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            <Link to="/contact">Nous contacter</Link>
          </button>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default Home;
