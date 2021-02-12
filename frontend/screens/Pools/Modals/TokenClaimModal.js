import React, { useState } from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Recoil from "app/recoil";
import { toast } from "react-toastify";
import { claimTokenFromPool, getPools} from "app/services/hashgraph/pool";
import { getAccounts } from "app/services/hashgraph/account";

function TokenClaimModal ({
  closeModal,
  currentPool,
  receiptToken,
}) {

  const accountAuth = useRecoilValue(Recoil.selectors.selectAuthorisedAccount);
  const setAllPools = useSetRecoilState(Recoil.atoms.allPoolsData);
  const setAccount = useSetRecoilState(Recoil.atoms.accountData);

  const [ currentTokenInput, setCurrentTokens] = useState(0)
  const [ lockInput, setLockInput] = useState(false)

  const maxTokens = parseInt(receiptToken.amount) / 10 ** receiptToken.token.decimals

  const updateValue = (event) => {
    setCurrentTokens(event.target.value)
  }

  const submitValid = currentTokenInput > 0 && currentTokenInput <= maxTokens

  const onClaimedToken = () => {
    setCurrentTokens(0)
    setLockInput(true)

    toast.info(`Attempting to claim tokens ${currentTokenInput} from ${receiptToken.token.symbol}`)

    const onFail = message => toast.error(message)

    const payload = {
      ...accountAuth,
      token_id: receiptToken.token.token_id,
      amount: currentTokenInput
    }

    claimTokenFromPool(payload, onFail).then(pool => {

      if (!pool) {
        return
      }

      toast.success(`Claimed tokens ${currentTokenInput} from ${receiptToken.token.symbol}`)

      getPools().then(pools => {
        setAllPools(pools.data)
      })

      getAccounts(accountAuth).then(account => {
        setAccount(account.data)
      })

      closeModal()

    })

  }

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="md:w-80 w-full  rounded shadow-lg p-6  dark:bg-gray-800 bg-white">
        <h1 className=" dark:text-gray-100 text-gray-800 font-bold text-lg">Claim your {currentPool.token.symbol} and swapped assets using {receiptToken.token.symbol}</h1>
        <div>
          <p className=" text-xs font-semibold mt-6 pb-4 leading-4 text-indigo-700 uppercase">Number of tokens (max {maxTokens})</p>
          <div className="flex items-center justify-between  bg-gray-100  rounded-lg px-4 cursor-pointer">
            <input
              disabled={lockInput}
              onChange={updateValue}
              id="number"
              className="py-4  text-base font-medium bg-gray-100 dark:text-gray-100 text-gray-800"
              placeholder="0"/>
          </div>
        </div>
        <div className="pt-6 flex items-center justify-between  ">
          <button
            className=" py-3.5 w-full   dark:text-gray-100 text-gray-600 focus:outline-none hover:opacity-90 text-sm font-semibold border border-gray-600 rounded"
            onClick={closeModal}>Cancel
          </button>
          <div className="pl-2 w-full">
            <button
              onClick={onClaimedToken}
              disabled={!submitValid}
              className="disabled:opacity-50 py-3.5 w-full text-white focus:outline-none hover:opacity-90 rounded border text-sm font-semibold border-indigo-700 bg-indigo-700">Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
export default TokenClaimModal;
