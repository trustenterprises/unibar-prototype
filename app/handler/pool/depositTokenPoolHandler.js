import depositPoolRequest from "app/validators/pool/depositPoolRequest"
import Response from "app/response"
import TokenData from "app/database/tokens";
import prepare from "app/utils/prepare";
import withRegisteredAccount from "app/middleware/withRegisteredAccount";
import DepositTokenService from "app/services/hashgraph/pool/depositTokenService";

async function DepositTokenPoolHandler(req, res) {

  const { body, authorisationAccount } = req
  const validationErrors = depositPoolRequest(body)

  if (validationErrors) {
    return Response.unprocessibleEntity(res, validationErrors)
  }

  const { token_id, amount } = body
  const token = await TokenData.find(token_id)

  // 1. The token needs to exist
  if (!token) {
    return Response.unprocessibleEntity(res, { error: `Token with token_id: ${token_id} does not exist` } )
  }

  const pool = token?.Pool?.[0]

  // 2. The pool needs to exist
  if (!pool) {
    return Response.unprocessibleEntity(res, { error:  `Pool with token_id: ${token_id} does not exist` })
  }

  const { hashgraphClient } = req.context

  const service = new DepositTokenService({
    hashgraphClient,
    pool,
    token,
    authorisationAccount
  })

  const currentRplPool = await service.checkForRewardLiquidityPoolExists()
  
  if (currentRplPool) {
    return Response.unprocessibleEntity(res, {error: `Reward Liquidity Pool for user: ${authorisationAccount.hedera_id} for token ${token_id} already exists`})
  }

  const userTokenHolding = await service.getUserTokenHolding()

  const proposedAmount = parseFloat(amount) * 10 ** userTokenHolding.token.decimals
  const tokenHodlStack = userTokenHolding.amount

  // 3. The token and amount needs to exist in users holdings
  if (proposedAmount > tokenHodlStack) {
    return Response.unprocessibleEntity(res, { error:  `You cannot deposit more tokens then you own into the pool` })
  }

  await service.transferTokensToPool(proposedAmount)
  await service.updatePoolValue(proposedAmount)

  const { proxyLiquidityPool, account } = await service.createNewRewardPoolAccount()

  const stored = await service.createLpToken({
    proxyLiquidityPool,
    account,
    amount,
    proposedAmount
  })

  await service.createRewardLiquidityPool({
    account,
    proposedAmount
  })

  await service.transferLpTokenToDepositee({
    proposedAmount,
    stored,
    proxyLiquidityPool,
    account
  })

  // Update this
  Response.json(res, "ok")
}

export default prepare(
  withRegisteredAccount
)(DepositTokenPoolHandler)
