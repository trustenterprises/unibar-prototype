import Response from "app/response"
import PoolData from "app/database/pool";
import TokenData from "app/database/tokens";
import createExchangeTransactionRequest from "app/validators/exchange/createExchangeTransactionRequest";
import ExchangeTransactionService from "app/services/hashgraph/exchange/exchangeTransactionService";

async function ExchangeTransactionHandler(req, res) {

  const { body, authorisationAccount } = req
  const validationErrors = createExchangeTransactionRequest(body)

  if (validationErrors) {
    return Response.unprocessibleEntity(res, validationErrors)
  }

  const { token_id, pool_token_id, amount } = body


  if (token_id === pool_token_id) {
    return Response.unprocessibleEntity(res, { error: `The parameters token_id and pool_token_id need to be different` } )
  }

  const token = await TokenData.find(token_id)

  // 1. The token needs to exist
  if (!token) {
    return Response.unprocessibleEntity(res, { error: `Token with token_id: ${token_id} does not exist` } )
  }

  const pool = await PoolData.find(pool_token_id)

  // 2. The pool needs to exist
  if (!pool) {
    return Response.unprocessibleEntity(res, { error:  `Pool with token_id: ${pool_token_id} does not exist` })
  }

  const holding = await TokenData.getUserTokenHolding({
    amount: "",
    tokenId: token.id,
    accountId: authorisationAccount.userId
  })

  const proposedAmount = amount * 10 ** holding.token.decimals

  if (proposedAmount > holding.amount ) {
    return Response.unprocessibleEntity(res, { error:  `Unable to make transfer as your balance isn't high enough` })
  }

  // TODO: We need a check for synthetic assets, with price data.

  const { hashgraphClient } = req.context

  const service = new ExchangeTransactionService({
    hashgraphClient,
    pool,
    token,
    authorisationAccount,
    amount: proposedAmount
  })

  await service.enablePoolAuthentication()

  // These association queries are wasteful
  await service.associatePooledTokenToUser()
  await service.associateTokenToPool()

  await service.atomicSwap()
  await service.updatePoolValue()
  await service.rewardPoolDistribution()

  Response.json(res, {
    state: "swap.success",
    sent: token_id,
    received: pool_token_id,
    amount: amount
  })

}

export default ExchangeTransactionHandler
