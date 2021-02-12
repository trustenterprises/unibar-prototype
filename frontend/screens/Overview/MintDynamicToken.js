import React, { useRef } from "react";

const MintDynamicToken = () => {
  let form = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form_data = new FormData(form.current);
    let payload = {};
    form_data.forEach(function (value, key) {
      payload[key] = value;
    });
    // console.log("payload", payload);
    // Place your API call here to submit your payload.
  };
  return (
    <div>
      <div>
        <form ref={form} onSubmit={handleSubmit} className="container mx-auto bg-white shadow rounded">
          <div className="xl:w-full border-b border-gray-300 py-5">
            <div className="flex items-center w-11/12 mx-auto">
              <p className="text-lg text-gray-800 font-bold">Mint Dynamic Non-Fungible Token (dNFT)</p>
            </div>
          </div>
          <div className="w-11/12 mx-auto">
            <div className="container mx-auto">
              <div className="my-8 mx-auto xl:w-full xl:mx-0">
                <div className="xl:flex lg:flex md:flex flex-wrap justify-between">
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800">
                      Name
                    </label>
                    <input type="text" name="firstName" required id="FirstName" className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder />
                  </div>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800">
                      Symbol
                    </label>
                    <input type="text" id="LastName" name="lastName" required className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder />
                  </div>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800">
                      Price
                    </label>
                    <input type="number" id="LastName" name="lastName" required className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder />
                  </div>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800">
                      Supply
                    </label>
                    <input type="number" id="LastName" name="lastName" required className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full py-4 sm:px-12 px-4 bg-gray-100 mt-6 flex justify-end rounded-bl rounded-br">
            <button className="bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm focus:outline-none" type="submit">
              Mint Dynamic Non-Fungible Token (dNFT)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default MintDynamicToken;

