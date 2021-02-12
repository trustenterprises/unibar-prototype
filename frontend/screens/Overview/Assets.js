import React, { useState } from "react";
import CreateAccountButton from "frontend/components/CreateAccountButton"
import GetAccountButton from "frontend/components/GetAccountButton"
import CreateTokenButton from "frontend/components/CreateTokenButton";
import Recoil from "app/recoil"
import { useRecoilValue } from 'recoil';
import FormCard from "frontend/components/Forms/FormCard";
import ScreenNavigation from "frontend/components/ScreenNavigation";
import navigation from "frontend/constants/navigation";
import TokenSummary from "../../components/Stats/TokenSummary";

function Assets() {

  // const accountAuth = useRecoilValue(Recoil.selectors.selectAuthorisedAccount);
  const accountData = useRecoilValue(Recoil.selectors.selectAccountData);

  if (!accountData.accounts) {
    return (
      <div className="bg-white w-full h-full rounded shadow px-12 pb-12">
        <div className="pt-12 text-center text-lg font-bold leading-4 dark:text-gray-100 text-gray-800">Please Authorize with Metamask 👆 ❤️</div>
      </div>
    )
  }

  const { holdings, mintedTokens } = accountData.accounts[0]


  return (
    <div className="bg-white w-full h-full rounded shadow px-12 pb-12">
      <TokenSummary />

      <h1 className="text-lg font-bold leading-4 dark:text-gray-100 text-gray-800">Current Holdings</h1>

      <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-6 gap-8">
        {holdings.map(holding =>
          <div className="rounded shadow border-2" >
            <div className="bg-white dark:bg-gray-800  rounded py-6 px-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm leading-none text-gray-500 dark:text-gray-400">{holding.token.symbol}</p>
                  <p className="text-4xl font-semibold leading-9 pt-4 text-gray-800 dark:text-gray-100">{holding.amount / 10 ** holding.token.decimals }</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="17" viewBox="0 0 21 17"
                       fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.22289 2C4.35888 2 3.54888 2.334 2.94288 2.941C1.68489 4.201 1.68489 6.252 2.94388 7.514L10.0029 14.585L17.0629 7.514C18.3219 6.252 18.3219 4.201 17.0629 2.941C15.8509 1.726 13.7149 1.728 12.5029 2.941L10.7109 4.736C10.3349 5.113 9.67089 5.113 9.29488 4.736L7.50288 2.94C6.89688 2.334 6.08788 2 5.22289 2ZM10.0029 17C9.73788 17 9.48289 16.895 9.29589 16.706L1.52788 8.926C-0.508115 6.886 -0.508115 3.567 1.52788 1.527C2.51188 0.543 3.82388 0 5.22289 0C6.62189 0 7.93489 0.543 8.91788 1.527L10.0029 2.614L11.0879 1.528C12.0719 0.543 13.3839 0 14.7839 0C16.1819 0 17.4949 0.543 18.4779 1.527C20.5149 3.567 20.5149 6.886 18.4789 8.926L10.7109 16.707C10.5229 16.895 10.2689 17 10.0029 17Z"
                      fill="#4338CA"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center pt-4">
                <p className="text-xs font-medium leading-3 pl-1 text-gray-500 dark:text-gray-400"> Hedera ID: {holding.token.token_id}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <h1 className="text-lg font-bold leading-4 dark:text-gray-100 text-gray-800 mt-12">Minted Tokens</h1>

      <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-6 gap-8">

        {mintedTokens.map(minted =>
          <div className="rounded shadow border-2" >
            <div className="bg-white dark:bg-gray-800  rounded py-6 px-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm leading-none text-gray-500 dark:text-gray-400">{minted.symbol}</p>
                  <p className="text-4xl font-semibold leading-9 pt-4 text-gray-800 dark:text-gray-100">{minted.supply }</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dashboard" width={32} height={32} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx={12} cy={13} r={2} />
                    <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                    <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs font-medium leading-3 pl-1 text-gray-500 dark:text-gray-400">balance</p>

              <div className="items-center pt-4">
                <p className="text-xs font-medium leading-3 pl-1 text-gray-500 dark:text-gray-400"> Hedera ID: {minted.token_id}</p>
                <p className="text-xs font-medium leading-3 pl-1 pt-1 text-gray-500 dark:text-gray-400"> Type: {minted.spec_ref}</p>
              </div>
              <div className="flex items-center">
                {minted.has_freeze &&
                  <div className="pt-4">
                    <div className="bg-indigo-200 h-6 w-20 mb-4  mr-2  md:mb-0 rounded-md flex items-center justify-center">
                      <span className="text-xs text-indigo-700 font-normal">Freeze</span>
                    </div>
                  </div>
                }
                {minted.has_kyc &&
                  <div className="pt-4">
                    <div className="bg-red-200 h-6 w-20 mb-4 md:mb-0 rounded-md flex items-center justify-center">
                      <span className="text-xs text-red-700 font-normal">KYC</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assets
