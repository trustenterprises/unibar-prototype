import React, { useRef } from "react";
const Index = () => {
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
              <p className="text-lg text-gray-800 font-bold">Personal Information</p>
              <div className="ml-2 cursor-pointer text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                  <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-11/12 mx-auto">
            <div className="container mx-auto">
              <div className="my-8 mx-auto xl:w-full xl:mx-0">
                <div className="xl:flex lg:flex md:flex flex-wrap justify-between">
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800">
                      First Name
                    </label>
                    <input type="text" name="firstName" required id="FirstName" className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder />
                  </div>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800">
                      Last Name
                    </label>
                    <input type="text" id="LastName" name="lastName" required className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder />
                  </div>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="email2" className="pb-2 text-sm font-bold text-gray-800">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <rect x={3} y={5} width={18} height={14} rx={2} />
                          <polyline points="3 7 12 13 21 7" />
                        </svg>
                      </div>
                      <input id="email2" name="email" required className="w-full text-gray-800 focus:outline-none  focus:border focus:border-indigo-700 font-normal py-3 flex items-center pl-16 text-sm border-green-400 rounded border shadow" placeholder="example@gmail.com" />
                    </div>
                    <div className="flex justify-between items-center pt-1 text-green-400">
                      <p className="text-xs">Email submission success!</p>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                        <path
                          className="heroicon-ui"
                          d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0
                                      0 1-1.4
                                      0l-2-2a1 1 0 0 1 1.4-1.42z"
                          stroke="currentColor"
                          strokeWidth="0.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="City" className="pb-2 text-sm font-bold text-gray-800">
                      City
                    </label>
                    <div className="border border-gray-300 shadow-sm rounded flex relative">
                      <select type="text" name="city" required id="City" className="bg-transparent appearance-none z-10 pl-3 py-3 w-full text-sm border border-transparent focus:outline-none focus:border-indigo-700 text-gray-800 rounded">
                        <option value="Switzerland">Switzerland</option>
                        <option value="America">America</option>
                        <option value="Australia">Australia</option>
                      </select>
                      <div className="px-4 flex items-center border-l border-gray-300 flex-col justify-center text-gray-500 absolute right-0 bottom-0 top-0 mx-auto z-0">
                        <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 15 12 9 18 15" />
                        </svg>
                        <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800">
                      Street Address
                    </label>
                    <input type="text" id="StreetAddress" name="streetAddress" required className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder />
                  </div>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="Country" className="pb-2 text-sm font-bold text-gray-800">
                      Country
                    </label>
                    <input type="text" id="Country" name="country" required className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder="California" />
                  </div>
                </div>
                <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                  <label htmlFor="State/Province" className="pb-2 text-sm font-bold text-gray-800">
                    State/Province
                  </label>
                  <input type="text" id="State/Province" name="state" required className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder="California" />
                </div>
                <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                  <div className="flex items-center pb-2">
                    <label htmlFor="ZIP" className="text-sm font-bold text-gray-800">
                      ZIP/Postal Code
                    </label>
                    <div className="ml-2 cursor-pointer text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                        <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <input type="text" id="ZIP" name="zip" className="border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder="e.g 86745" />
                  <div className="flex justify-between items-center pt-1 text-red-400">
                    <p className="text-xs">Incorrect Zip Code</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                      <circle cx={12} cy={12} r={10} />
                      <line x1={15} y1={9} x2={9} y2={15} />
                      <line x1={9} y1={9} x2={15} y2={15} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full py-4 sm:px-12 px-4 bg-gray-100 mt-6 flex justify-end rounded-bl rounded-br">
            <button className="btn text-sm focus:outline-none text-gray-600 border border-gray-300 py-2 px-6 mr-4 rounded hover:bg-gray-200 transition duration-150 ease-in-out">Restore</button>
            <button className="bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm focus:outline-none" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
      ;
    </div>
  );
};
export default Index;

