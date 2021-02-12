import React, { useRef, useState } from "react";
import InputData from "app/utils/input"
import { useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import Recoil from "app/recoil";
import { getPools, createPool } from "app/services/hashgraph/pool";

import { toast } from "react-toastify";

function CreatePool () {

  const accountAuth = useRecoilValue(Recoil.selectors.selectAuthorisedAccount);
  const accountData = useRecoilValue(Recoil.selectors.selectAccountData);
  const pools = useRecoilValue(Recoil.selectors.selectAllPoolsData);
  const setAllPools = useSetRecoilState(Recoil.atoms.allPoolsData);

  const [show, setShow] = useState(false);
  const [tokenSelected, setSelectedToken] = useState({});

  const form = useRef(null);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const { token } = tokenSelected

    if (!token) {
      toast.warn('Please select a token before creating a pool')
    }

    const payload = {
      ...InputData.extractFormData(form),
      ...accountAuth,
      token_id: token.token_id
    }

    toast.info(`Attempting to create pool for ${payload.name}`)

    const onFail = message => toast.error(message)

    createPool(payload, onFail).then(pool => {

      if (!pool) {
        return
      }

      getPools().then(pools => {
        setAllPools(pools.data)
      })

      toast.success(`Created pool ${payload.name}`)
    })
  };

  const account = accountData.accounts?.[0]
  const poolTokenSet = pools.length ? new Set(pools.map(pool => pool.token.token_id)): new Set()
  const holdingsWithoutPooled = account?.holdings?.filter(holding => !poolTokenSet.has(holding.token.token_id))

  return (
    <div>
      <div>
        <form ref={form} onSubmit={handleSubmit} className="container mx-auto bg-white shadow rounded">
          <div className="xl:w-full border-b border-gray-300 py-5">
            <div className="flex items-center w-11/12 mx-auto">
              <p className="text-lg text-gray-800 font-bold">{ account ? 'Create new pool' : 'Please authenticate to create a pool' }</p>
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

                  {account?.holdings?.length &&
                    <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                      <label htmlFor="symbol" className="pb-2 text-sm font-bold text-gray-800">
                        Select a token
                      </label>
                      <div className="relative">
                        <div
                          className="bg-indigo-700 flex items-center justify-between rounded w-40 border border-indigo-700"
                          onClick={() => setShow(!show)}>
                          <p className="pl-3 py-3 text-white text-sm leading-3 tracking-normal font-normal">{ tokenSelected.token?.symbol || "Select a token"}</p>
                          <div className="cursor-pointer text-white mr-3">
                            {show ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up"
                                   width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                   fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <polyline points="6 15 12 9 18 15"/>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up"
                                   width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                   fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <polyline points="6 9 12 15 18 9"/>
                              </svg>
                            )}
                          </div>
                        </div>
                        {show && (
                          <ul
                            className="visible transition duration-300 opacity-100 ease-out bg-white shadow rounded mt-2 py-1 w-48 absolute">
                            {holdingsWithoutPooled.map(holding =>
                              <li
                                className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal"
                                data-id={holding}
                                onClick={() => setSelectedToken(holding)}
                              >{holding.token.symbol}</li>
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="w-full py-4 sm:px-12 px-4 bg-gray-100 mt-6 flex justify-end rounded-bl rounded-br">
            {account &&
              <button
                className="bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm focus:outline-none"
                type="submit">
                Create new pool
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePool;

