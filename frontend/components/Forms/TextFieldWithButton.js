import React from "react";
const Index = () => {
  return (
    <div>
      <div className="xl:w-5/12 w-11/12 mx-auto mb-4 my-6 md:w-2/3 shadow sm:px-10 sm:py-6 py-4 px-4 bg-white rounded-md">
        <p className="text-lg text-gray-800 font-semibold mb-3">Update Your Email</p>
        <label htmlFor="email" className="text-sm text-gray-600 font-normal">
          Change email associated with you account
        </label>
        <div className="flex flex-col items-start sm:items-center sm:flex-row mt-4">
          <div className="relative w-full sm:w-2/3">
            <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <rect x={3} y={5} width={18} height={14} rx={2} />
                <polyline points="3 7 12 13 21 7" />
              </svg>
            </div>
            <input id="email" className="py-3 stext-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full pl-16 text-sm border-gray-300 rounded border shadow" placeholder="youremail@example.com" />
          </div>
          <button className="mt-4 sm:mt-0 sm:ml-4 focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm">Submit</button>
        </div>
      </div>

    </div>
  );
};
export default Index;
