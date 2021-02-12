import Response from "app/response"
import claimRewardTransactionRequest from "app/validators/claim/claimRewardTransactionRequest";
import Specification from "app/hashgraph/tokens/specifications";
import PoolData from "app/database/pool";
import ClaimTokensService from "app/services/hashgraph/claim/claimTokensService";

async function ClaimRewardTransactionHandler(req, res) {

  const { body, authorisationAccount } = req
  const validationErrors = claimRewardTransactionRequest(body)

  if (validationErrors) {
    return Response.unprocessibleEntity(res, validationErrors)
  }

  const { token_id, amount } = body

  const tokenList = authorisationAccount.holdings.filter(holding => {
    return holding.token.token_id === token_id
  })

  const holding = tokenList?.[0]

  if (!holding) {
    return Response.unprocessibleEntity(res, { error: `Unable to see ${token_id} in your holdings` } )
  }

  const LpRef = Specification.UnibarLiquidityProviderReceipt.reference

  if (holding.token.spec_ref !== LpRef) {
    return Response.unprocessibleEntity(res, { error: `You can only claim rewards with Liquity Reward tokens with the reference "${LpRef}"` } )
  }

  const proposedAmount = amount * 10 ** holding.token.decimals

  if (proposedAmount > holding.amount) {
    return Response.unprocessibleEntity(res, { error: `You cannot withdraw more receipt tokens then you own` } )
  }

  const removePercentageOfPool = Math.floor(proposedAmount / holding.amount * 100)

  if (removePercentageOfPool === 0) {
    return Response.unprocessibleEntity(res, { error: `That amount is too low to claim back rewards` } )
  }

  const proxyPool = await PoolData.proxyRewardPool(holding.token.creatorId)

  const { EscrowTreasury, ...proxyPoolAccount } = proxyPool
  const rewardLpPool = EscrowTreasury[0].RewardLiquidityPool
  const pool = rewardLpPool[0].Pool

  const { hashgraphClient } = req.context

  const service = new ClaimTokensService({
    token: holding.token,
    percentage: removePercentageOfPool,
    hashgraphClient,
    authorisationAccount,
    proxyPoolAccount,
    pool,
  })

  await service.enablePoolAuthentication()
  await service.enableProxyAuthentication()

  // Send receipt to proxy
  await service.sendReceiptToProxy()

  // Get rewards back from proxy
  const rewardTokens = await service.sendRewardsToUser()

  // get tokens from parent pool
  const originalTokens = await service.getTokensFromParentPool()

  Response.json(res, {
    state: "claim.success",
    claimed: token_id,
    amount: amount,
    received: {
      percentage_rewards: removePercentageOfPool,
      reward_tokens: rewardTokens,
      original_tokens: originalTokens
    }
  })
}

export default ClaimRewardTransactionHandler
