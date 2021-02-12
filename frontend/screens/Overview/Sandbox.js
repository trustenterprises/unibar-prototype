import React, { useState } from "react";
import CreateAccountButton from "frontend/components/CreateAccountButton"
import GetAccountButton from "frontend/components/GetAccountButton"
import CreateTokenButton from "frontend/components/CreateTokenButton";
import Recoil from "app/recoil"
import { useRecoilValue } from 'recoil';
import FormCard from "frontend/components/Forms/FormCard";
import ScreenNavigation from "frontend/components/ScreenNavigation";
import navigation from "frontend/constants/navigation";

function Sandbox() {

  const accountAuth = useRecoilValue(Recoil.selectors.selectAuthorisedAccount);

  return (
    <div className="bg-white w-full h-full rounded shadow">
      {accountAuth.account ? <>
        <button
          className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-6 py-2 text-sm">Check
          Authorise {accountAuth.account}</button>

        <CreateAccountButton/>
        <GetAccountButton/>
        <CreateTokenButton/>


        <button
          className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-6 py-2 text-sm">Create/Submit
          to pool
        </button>
      </> :
        <div className="py-10 px-4 transition duration-150 ease-in-out">👆 Please Authorise Metamask</div>
      }
    </div>
  );
}

export default Sandbox;
