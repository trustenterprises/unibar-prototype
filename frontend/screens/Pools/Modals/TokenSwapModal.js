import React, { useState } from "react";
import Specification from "app/hashgraph/tokens/specifications";
import {toast} from "react-toastify";
import { exchangeSwapTokens, getPools } from "app/services/hashgraph/pool";
import { getAccounts } from "app/services/hashgraph/account";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Recoil from "app/recoil";


function TokenSwapModal ({
 closeModal,
 currentPool,
 holdings
}) {

  const accountAuth = useRecoilValue(Recoil.selectors.selectAuthorisedAccount);
  const setAllPools = useSetRecoilState(Recoil.atoms.allPoolsData);
  const setAccount = useSetRecoilState(Recoil.atoms.accountData);

  const [ currentTokenInput, setCurrentTokens] = useState(0)
  const [ currentToken, setcurrentToken] = useState({})
  const tokensInPool = currentPool.amount / 10 ** currentPool.token.decimals

  const updateValue = (event) => {
    setCurrentTokens(event.target.value)
  }

  const holdingsWithBalance = holdings.filter(holding => {
    const ensureFungible = holding.token.spec_ref === Specification.Fungible.reference
    const ensureNotPooled = holding.token.token_id !== currentPool.token.token_id

    return parseInt(holding.amount) > 0 && ensureFungible && ensureNotPooled
  })

  const lessThenLiquidity = currentTokenInput <= tokensInPool
  const lowBalance = currentTokenInput >= parseInt(currentToken.amount) / 10 ** currentToken.token?.decimals
  const canConfirm = currentTokenInput > 0 && lessThenLiquidity && !lowBalance

  const onSwapToken = () => {
    setCurrentTokens(0)
    // setLockInput(true)

    toast.info(`Attempting to swap ${currentToken.token.symbol} tokens for ${currentTokenInput} ${currentPool.token.symbol}`)

    const onFail = message => toast.error(message)

    const payload = {
      ...accountAuth,
      token_id: currentToken.token.token_id,
      pool_token_id: currentPool.token.token_id,
      amount: currentTokenInput
    }

    exchangeSwapTokens(payload, onFail).then(pool => {

      toast.success(`Swapped ${currentTokenInput} ${currentToken.token.symbol} tokens for  ${currentTokenInput} ${currentPool.token.symbol}`)

      getPools().then(pools => {
        setAllPools(pools.data)
      })

      getAccounts(accountAuth).then(account => {
        setAccount(account.data)
      })

      // closeModal()
    })
  }
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="md:w-80 w-full  rounded shadow-lg p-6  dark:bg-gray-800 bg-white">
        <h1 className=" dark:text-gray-100 text-gray-800 font-bold text-lg">Swap your tokens 1:1 for {currentPool.token.symbol}</h1>
        <h3 className=" dark:text-gray-00 text-gray-400 font-bold text-sm">Current {currentPool.token.symbol} liquidity {tokensInPool} tokens</h3>
        <p className="pt-6 text-xs font-semibold text-indigo-700 uppercase">Your Token</p>
        <div>
          <div className="relative flex items-center justify-center ">
            <select
              className=" rounded-lg bg-gray-100 py-3.5 bg-transparent outline-none font-medium text-base px-4 text-white my-6 appearance-none relative w-full  dark:text-gray-100 text-gray-800">
              <option className="text-base font-medium  dark:text-gray-100 text-gray-800" onClick={() => setcurrentToken({})}>Select a token</option>
              { holdingsWithBalance.map(holding =>
                <option className="text-base font-medium  dark:text-gray-100 text-gray-800" onClick={() => setcurrentToken(holding)}>{holding.token.symbol}({holding.amount / 10 ** holding.token.decimals})</option>
              )}
            </select>
            <div className="absolute right-0  mr-4 pointer-events-none">
              <svg aria-haspopup="true" aria-label="Main Menu" xmlns="http://www.w3.org/2000/svg"
                   className="show-m-menu icon icon-tabler icon-tabler-menu" width={24} height={24} viewBox="0 0 24 24"
                   strokeWidth="1.5" stroke="#4B5563" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
          <p className=" text-xs font-semibold pb-4 leading-4 text-indigo-700 uppercase">AMOUNT</p>
          <div className="flex items-center justify-between  bg-gray-100  rounded-lg px-4 cursor-pointer">
            <input
              disabled={!currentToken.token}
              onChange={updateValue}
              id="number"
              className="py-4  text-base font-medium bg-gray-100 dark:text-gray-100 text-gray-800"
              placeholder="0"/>
          </div>
        </div>

        {!lessThenLiquidity || lowBalance &&
          <p className="pt-4 text-xs font-semibold leading-4 text-red-500 uppercase">UNABLE TO SWAP ASSETS</p>
        }

        {canConfirm &&
          <p className="pt-4 text-xs font-semibold leading-4 text-indigo-500 uppercase">SWAP {currentTokenInput} {currentToken.token.symbol} for {currentTokenInput} {currentPool.token.symbol}</p>
        }

        <div className="pt-4 flex items-center justify-between  ">
          <button
            className=" py-3.5 w-full   dark:text-gray-100 text-gray-600 focus:outline-none hover:opacity-90 text-sm font-semibold border border-gray-600 rounded"
            onClick={closeModal}>Cancel
          </button>
          <div className="pl-2 w-full">
            <button
              onClick={onSwapToken}
              disabled={!canConfirm}
              className="disabled:opacity-50 py-3.5 w-full   text-white focus:outline-none hover:opacity-90 rounded border text-sm font-semibold border-indigo-700 bg-indigo-700">Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenSwapModal;
