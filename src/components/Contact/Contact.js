import React from "react";
import APIManager from "../../services/api";

const Contact = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const last_name = e.target.last_name.value;
        const first_name = e.target.first_name.value;
        const email = e.target.email.value;
        const content = e.target.content.value
    
        await APIManager.contactForm(last_name, first_name, email, content)
        .catch((error) => {
          console.log(error.message);
        });
        document.getElementById("message").innerHTML = "Merci pour votre demande, notre équipe vous répondra dans les plus brefs délais sur votre adresse mail:<b> " + email
        console.log("Success")
      };

  return (
      <div className="wrapper flex items-center justify-center">
        <div id="message" className="w-1/2 mt-20">
          <h2 className="my-2 text-3xl font-bold leading-tight text-center text-gray-800">
            Nous contacter
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
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="focusForm mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="focusForm mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3 mt-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Adresse email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="focusForm mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        
                      />
                    </div>
                    <div>
                    <label htmlFor="about" className="mt-4 block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="content"
                        name="content"
                        rows={3}
                        className="focusForm mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        defaultValue={''}
                        placeholder={"..."}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
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
  );
};

export default Contact;
