import React, { useState } from "react";
import QRImage from 'react-qr-image'
import { useRecoilValue } from "recoil";
import Recoil from "app/recoil";
import { toast } from 'react-toastify';

function Account() {

  const accountData = useRecoilValue(Recoil.selectors.selectAccountData);

  if (!accountData.accounts) {
    return (
      <div className="bg-white w-full h-full rounded shadow px-12 pb-12">
        <div className="pt-12 text-center text-lg font-bold leading-4 dark:text-gray-100 text-gray-800">Please Authorize with Metamask 👆 ❤️</div>
      </div>
    )
  }

  const account = accountData.accounts?.[0]
  const explorerUrl = `https://explorer.kabuto.sh/testnet/id/${account.hedera_id}`

  // Util me
  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    textField.innerText = explorerUrl
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()

    toast.info(`Copied explorer url to clipboard for user: ${account.hedera_id}`)
  }

  return (
      <div className="flex items-center justify-center py-8">
        <div className="cursor-pointer rounded-md shadow-lg bg-white relative">
          <div className="py-5">
            <div className="px-6">
              <p className="text-xs text-gray-400">Network</p>
              <p className="text-sm leading-none text-justify text-gray-800 mt-1">Testnet</p>
            </div>
            <div className="mt-5 px-6">
              <p className="text-xs text-gray-400">Ethereum Address</p>
              <p className="text-sm leading-none text-justify text-gray-800 mt-1">{accountData.eth_address}</p>
            </div>
            <div className="mt-5 px-6">
              <p className="text-xs text-gray-400">Hedera Account Id</p>
              <p className="text-sm leading-none text-justify text-gray-800 mt-1">{account.hedera_id}</p>
            </div>
            <div className="mt-5 px-6 flex items-center w-full">
              <div>
                <p className="text-xs text-gray-400">Total Minted Assets</p>
                <p className="text-sm leading-none text-justify text-gray-800 mt-1">{account.mintedTokens.length}</p>
              </div>
              <div className="ml-14">
                <p className="text-xs text-gray-400">Total Holdings</p>
                <p className="text-sm leading-none text-justify text-gray-800 mt-1">{account.holdings.length}</p>
              </div>
            </div>
            <div className="mt-5 px-6 flex  items-center" onClick={copyToClipboard}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M6.66663 9.33342C7.1055 9.78135 7.7062 10.0338 8.33329 10.0338C8.96039 10.0338 9.56109 9.78135 9.99996 9.33342L12.6666 6.66676C13.5871 5.74628 13.5871 4.2539 12.6666 3.33342C11.7462 2.41295 10.2538 2.41295 9.33329 3.33342L8.99996 3.66676" stroke="#718096" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M9.3333 6.66665C8.89443 6.21872 8.29373 5.96631 7.66663 5.96631C7.03954 5.96631 6.43884 6.21872 5.99997 6.66665L3.3333 9.33332C2.41283 10.2538 2.41283 11.7462 3.3333 12.6666C4.25377 13.5871 5.74616 13.5871 6.66663 12.6666L6.99997 12.3333" stroke="#718096" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <p className="ml-2 text-xs leading-3 text-gray-600">{explorerUrl}</p>
              <p />
              <svg className="ml-3.5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                <rect x="5.33331" y="5.33301" width={8} height={8} rx="1.33333" stroke="#718096" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.6667 5.33366V4.00033C10.6667 3.26395 10.0697 2.66699 9.33335 2.66699H4.00002C3.26364 2.66699 2.66669 3.26395 2.66669 4.00033V9.33366C2.66669 10.07 3.26364 10.667 4.00002 10.667H5.33335" stroke="#718096" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="pt-6 flex justify-between relative items-center w-full">
              <div className="w-3 h-5 bg-gray-100 rounded-r-3xl" />
              <div className="w-full border-b-2 border-dashed border-gray-100" />
              <div className="w-3 h-5  bg-gray-100 rounded-l-3xl" />
            </div>
            <div className="mt-4 px-6 flex flex-col w-full justify-center items-center">
              <p className="text-xs text-gray-400">Import QR</p>
              <QRImage text={account.hedera_id}  />
              <p className="text-sm font-bold leading-none text-gray-700 mt-2">{account.hedera_id}</p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Account;
