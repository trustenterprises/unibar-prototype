import React, { useEffect } from "react";
import Chart from "chart.js"
import { useRecoilValue } from "recoil";
import Recoil from "app/recoil";
import Specification from "app/hashgraph/tokens/specifications"

function TokenSummary() {

  const accountData = useRecoilValue(Recoil.selectors.selectAccountData);

  if (!accountData.accounts) {
    return <div>Please Authenticate</div>
  }

  const { holdings, mintedTokens } = accountData.accounts[0]
  const totalTokens = holdings.length +  mintedTokens.length

  const normalHoldings = holdings.filter(holding =>
    holding.token.spec_ref !== Specification.UnibarLiquidityProviderReceipt.reference
  )

  const lpHoldings = holdings.filter(holding =>
    holding.token.spec_ref === Specification.UnibarLiquidityProviderReceipt.reference
  )

  const holdingsPercent = Math.round(normalHoldings.length / totalTokens * 100) | 0
  const lpPercent = Math.round(lpHoldings.length / totalTokens * 100) | 0
  const mintedPercent = Math.round(mintedTokens.length / totalTokens * 100) |0

  useEffect(() => {

    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Holdings", "Minted", "LP Receipts"],
        datasets: [
          {
            borderColor: ["#312E81 ", "#4338CA", "#6366F1"],
            backgroundColor: ["#312E81 ", "#4338CA", "#6366F1"],
            data: [holdings.length | 1, mintedTokens.length | 1, normalHoldings.length | 1],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
      },
    });
  }, []);


  return (
    <>
      <div className="flex items-center justify-center">
        <div className="py-8 px-4">
          <div className="md:w-96 rounded-md shadow-lg py-4 px-6 dark:bg-gray-800 bg-white">
            <h1 className="text-lg font-bold leading-4 dark:text-gray-100 text-gray-800">Token Summary</h1>
            <div className="md:flex items-center pt-5">
              <div className="h-40 w-40">
                <canvas id="myChart" height="100%" width="100%" />
              </div>
              <div className="pl-8 md:mt-0 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-900" />
                  <h1 className="dark:text-white text-indigo-900 text-xs leading-3 md:pl-1 pl-2 font-normal">Holdings: {holdingsPercent}%</h1>
                </div>
                <div className="flex items-center py-4">
                  <div className="w-3 h-3 rounded-full bg-indigo-700" />
                  <h1 className="dark:text-white text-indigo-700 text-xs leading-3 md:pl-1 pl-2 font-normal">Minted: {mintedPercent}%</h1>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <h1 className="dark:text-white text-indigo-500 text-xs leading-3 md:pl-1 pl-2 font-normal">LP Receipts: {lpPercent}%</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TokenSummary
