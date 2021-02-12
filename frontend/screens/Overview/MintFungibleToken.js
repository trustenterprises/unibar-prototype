import React, { useRef } from "react";
import InputData from "app/utils/input"
import { useRecoilState, useRecoilValue } from "recoil";
import Recoil from "app/recoil";
import { createToken } from "app/services/hashgraph/token";
import { getAccounts } from "app/services/hashgraph/account";
import { toast } from "react-toastify";

// TODO: Ensure this cannot be acted upon if not auth'd
function MintFungibleToken () {

  const [_, setAccount] = useRecoilState(Recoil.atoms.accountData);
  const accountAuth = useRecoilValue(Recoil.selectors.selectAuthorisedAccount);
  const form = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = InputData.extractFormData(form)

    toast.info(`Creating token with name: ${payload.name}, symbol: ${payload.symbol} and initial supply of ${payload.supply} tokens`)

    const mutatePayload = {
      ...payload,
      requires_kyc: payload.requires_kyc === "on",
      can_freeze: payload.can_freeze === "on"
    }
    await createToken({
      ...accountAuth,
      ...mutatePayload
    })

    toast.success(`Successfully created ${payload.name} (${payload.symbol}) token`)

    getAccounts(accountAuth).then(account => {
      setAccount(account.data)
    })
  };

  return (
    <div>
      <div>
        <form ref={form} onSubmit={handleSubmit} className="container mx-auto bg-white shadow rounded">
          <div className="xl:w-full border-b border-gray-300 py-5">
            <div className="flex items-center w-11/12 mx-auto">
              <p className="text-lg text-gray-800 font-bold">Mint Fungible Token</p>
            </div>
          </div>
          <div className="w-11/12 mx-auto">
            <div className="container mx-auto">
              <div className="my-8 mx-auto xl:w-full xl:mx-0">
                <div className="xl:flex lg:flex md:flex flex-wrap justify-between">
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="name" className="pb-2 text-sm font-bold text-gray-800">
                      Name
                    </label>
                    <input type="text" name="name" required id="name" className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder />
                  </div>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="symbol" className="pb-2 text-sm font-bold text-gray-800">
                      Symbol
                    </label>
                    <input type="text" id="symbol" name="symbol" required className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder />
                  </div>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="price" className="pb-2 text-sm font-bold text-gray-800">
                      Initial Price (USD)
                    </label>
                    <input type="number" id="price" name="price" required className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder />
                  </div>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label htmlFor="supply" className="pb-2 text-sm font-bold text-gray-800">
                      Supply
                    </label>
                    <input type="number" id="supply" name="supply" required className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800" placeholder />
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="py-4 flex items-center">
                    <div className="bg-white border rounded-sm border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                      <input type="checkbox" id="requires_kyc" name="requires_kyc" className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                      <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                        <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M5 12l5 5l10 -10" />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-base leading-4 font-normal text-gray-800">Require KYC</p>
                  </div>
                  <div className="py-4 flex items-center">
                    <div className="bg-white border rounded-sm border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                      <input id="can_freeze" name="can_freeze" type="checkbox" className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                      <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                        <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M5 12l5 5l10 -10" />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-base leading-4 font-normal text-gray-800">Enable Freeze</p>
                  </div>
                  <style>
                    {`  .checkbox:checked + .check-icon {
                            display: flex;
                        }`}
                  </style>
                </div>
              </div>
            </div>
          </div>
            <div className="w-full py-4 sm:px-12 px-4 bg-gray-100 mt-6 flex justify-end rounded-bl rounded-br">
              <button
                disabled={!accountAuth.signature}
                className="disabled:opacity-50 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm focus:outline-none"
                type="submit">
                Mint new fungible token
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default MintFungibleToken;

