import React, { useState } from "react";
import CreateAccountButton from "frontend/components/CreateAccountButton"
import GetAccountButton from "frontend/components/GetAccountButton"
import CreateTokenButton from "frontend/components/CreateTokenButton";
import Recoil from "app/recoil"
import { useRecoilValue } from 'recoil';
import FormCard from "frontend/components/Forms/FormCard";
import ScreenNavigation from "frontend/components/ScreenNavigation";
import navigation from "frontend/constants/navigation";

function Status() {

  // const accountAuth = useRecoilValue(Recoil.selectors.selectAuthorisedAccount);

  return (
    <div className="bg-white w-full h-full rounded shadow">

    </div>
  );
}

export default Status;
