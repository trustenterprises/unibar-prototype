import React, { useState } from "react";
import Recoil from "app/recoil"
import { useRecoilValue } from 'recoil';
import TokenDepositModal from "./Modals/TokenDepositModal";
import TokenSwapModal from "./Modals/TokenSwapModal";
import TokenClaimModal from "./Modals/TokenClaimModal";

function Pools() {

  // Hook state
  const [ showDeposit, setShowDeposit ] = useState(false)
  const [ showSwap, setShowSwap ] = useState(false)
  const [ showClaim, setShowClaim ] = useState(false)

  const [ currentPool, setCurrentPool ] = useState({})

  const pools = useRecoilValue(Recoil.selectors.selectAllPoolsData);
  const accountData = useRecoilValue(Recoil.selectors.selectAccountData);

  const account = accountData.accounts?.[0]

  if (!pools.length) {
    return <div> Not pools have been found </div>
  }

  const tokenHoldings = new Set(account?.holdings?.map(holding => holding.token.token_id))

  const onDeposit = pool => {
    setShowDeposit(true)
    setCurrentPool(pool)
  }

  const onSwap = pool => {
    setShowSwap(true)
    setCurrentPool(pool)
  }

  const onClaim = pool => {
    setShowClaim(true)
    setCurrentPool(pool)
  }

  const closeModal = () => {
    setShowDeposit(false)
    setShowClaim(false)
    setShowSwap(false)
    setCurrentPool({})
  }

  if (showDeposit) {

    const holding = account.holdings.filter(holding => holding.token.token_id === currentPool.token.token_id)
    const token = holding?.[0]
    const maxTokens = parseInt(token.amount) / 10 ** token.token.decimals

    return (
      <TokenDepositModal
        closeModal={closeModal}
        currentPool={currentPool}
        maxTokens={maxTokens}
      />
    )
  }

  if (showSwap) {
    return (
      <TokenSwapModal
        closeModal={closeModal}
        currentPool={currentPool}
        holdings={account.holdings}
      />
    )
  }

  if (showClaim) {
    const holding = account.holdings.filter(holding => holding.token.token_id === currentPool.token.token_id)
    const token = holding?.[0]

    const receipt = account.holdings.filter(holding => holding.token.symbol === `${token.token.symbol}:LP:RECEIPT`)

    if (receipt.length) {
      return (
        <TokenClaimModal
          receiptToken={receipt?.[0]}
          closeModal={closeModal}
          currentPool={currentPool}
        />
      )
    }
  }

  return (
    <div className="bg-white w-full h-full rounded shadow px-12 pb-12">
      <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-6 gap-8">
        {pools.map(pool =>
          <div className="rounded shadow border-2" >
            <div className="bg-white dark:bg-gray-800  rounded py-6 px-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm leading-none text-gray-500 dark:text-gray-400">{pool.name}</p>
                  <p className="text-sm leading-none text-gray-500 dark:text-gray-200">({pool.token.symbol})</p>
                  <p className="text-4xl font-semibold leading-9 pt-4 text-gray-800 dark:text-gray-100">{pool.amount / 10 ** pool.token.decimals}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center pt-4">
                <p className="text-xs font-medium leading-3 pl-1 text-gray-500 dark:text-gray-400"> Hedera ID: {pool.token.token_id}</p>
              </div>
            </div>
            <div className="items-center px-4 pb-4 flex flex-wrap">
              {/* Code block for gray button starts */}
              {parseInt(pool.amount) > 0 && tokenHoldings.has(pool.token.token_id) &&
                <button className="mx-2 my-2 bg-red-100 transition duration-150 ease-in-out hover:bg-red-200 rounded border border-red-300 text-red-600 px-5 py-1 text-xs" onClick={() => onClaim(pool)}>Claim</button>
              }
              {/* Code block for gray button ends */}
              {/* Code block for gray alternative button starts */}

              {parseInt(pool.amount) === 0 && tokenHoldings.has(pool.token.token_id) &&
                <button
                  className="mx-2 my-2 bg-blue-200 transition duration-150 ease-in-out focus:outline-none hover:bg-blue-300 rounded text-blue-700 px-5 py-1 text-xs" onClick={() => onDeposit(pool)}>Deposit</button>
                }
              {/* Code block for indigo grey button ends */}
              {/* Code block for primary button starts */}

              {parseInt(pool.amount) > 0 &&
                <button className="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-5 py-1 text-xs" onClick={() => onSwap(pool)}>Token Swap</button>
              }
              {/* Code block for button with icon ends */}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Pools
