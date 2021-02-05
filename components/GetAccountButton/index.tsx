import React from "react";
import { getAccounts } from "app/services/hashgraph/account";
import { useRecoilValue } from "recoil";
import Recoil from "app/recoil";

function GetAccountButton() {

  const accountAuth = useRecoilValue(Recoil.selectors.selectAuthorisedAccount);

  const onClickGetAccount = () => {
    getAccounts(accountAuth).then(console.log)
  }

  return (
    <div className="mt-6 lg:mt-0">
      <button
        className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-6 py-2 text-sm"
        onClick={onClickGetAccount}>Get Hedera account</button>
    </div>
  );
}

// @ts-ignore
export default GetAccountButton;
