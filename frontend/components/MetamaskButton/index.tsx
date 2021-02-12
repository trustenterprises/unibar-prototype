import React, { useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { injected } from './web3/connectors'
import { useEagerConnect, useInactiveListener } from './web3/hooks'
import Recoil from "app/recoil"
import {useRecoilState, useSetRecoilState} from 'recoil';
import { generateSignature } from "app/services/ethereum/metamask";
import { getPools } from "app/services/hashgraph/pool";
import {createAccount, getAccounts} from "app/services/hashgraph/account";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function getAccountsApi(accountAuth) {
  const [_, setAccount] = useRecoilState(Recoil.atoms.accountData);

  // const accountAuth = useRecoilValue(Recoil.selectors.selectAuthorisedAccount);

  getAccounts(accountAuth).then(account => {
    setAccount(account.data)
  })
}

// Need to return to this an check that metamask is installed and authorised.
function Web3Authorisation() {

  const context = useWeb3React<Web3Provider>()
  const { connector, library, account, activate } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>()

  const setSignature = useSetRecoilState(Recoil.atoms.signatureAuth);
  const setAccount = useSetRecoilState(Recoil.atoms.accountData);
  const setAllPools = useSetRecoilState(Recoil.atoms.allPoolsData);

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  useInactiveListener(!triedEager || !!activatingConnector)

  const onClickActivate = () => {
    setActivatingConnector(injected)

    activate(injected)

    const onSuccess = (signature) => {
      setSignature(signature)

      const register = () => {
        createAccount(signature).then(() =>
          getAccounts(signature).then(account => {
            return setAccount(account.data)
          })
        )
      }

      getAccounts(signature).then(account => {
        if (account) {
          return setAccount(account.data)
        }

        register()
      })

      getPools().then(pools => {
        setAllPools(pools.data)
      })
    }

    getPools()

    generateSignature({
      library,
      account,
      onSuccess
    })
  }

  return (
    <div className="mt-6 lg:mt-0">
      <button
        className="focus:outline-none transition duration-150 ease-in-out hover:bg-gray-200 border bg-white rounded text-gray-900 px-8 py-2 text-sm"
        onClick={onClickActivate}>Authorize with Metamask 🚀</button>
    </div>
  );
}


function Metamask() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Authorisation />
    </Web3ReactProvider>
  )
}

// @ts-ignore
export default Metamask;
