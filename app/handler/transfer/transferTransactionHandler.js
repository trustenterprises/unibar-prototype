import Response from "app/response"
import AccountData from "app/database/account";
import sendTransferRequest from "app/validators/transfer/sendTransferTransactionRequest";
import ExchangeTransactionService from "app/services/hashgraph/exchange/exchangeTransactionService";
import Specification from "app/hashgraph/tokens/specifications";
import PoolData from "../../database/pool";

async function TransferTransactionHandler(req, res) {

  const { body, authorisationAccount } = req
  const validationErrors = sendTransferRequest(body)

  if (validationErrors) {
    return Response.unprocessibleEntity(res, validationErrors)
  }

  const { token_id, recipient, amount } = body

  const receiver = await AccountData.accountExists(recipient)

  if (!receiver) {
    return Response.unprocessibleEntity(res, { error: `Recipient does not exist with hedera id ${recipient}` } )
  }

  const tokenList = authorisationAccount.holdings.filter(holding => {
    return holding.token.token_id === token_id
  })

  const holding = tokenList?.[0]

  if (!holding) {
    return Response.unprocessibleEntity(res, { error: `Unable to see ${token_id} in your holdings` } )
  }

  const proposedAmount = parseFloat(amount) * 10 ** holding.token.decimals
  const tokenHodlStack = parseFloat(holding.amount)

  if (proposedAmount > tokenHodlStack) {
    return Response.unprocessibleEntity(res, { error:  `You cannot send more tokens then you own to a recipient` })
  }

  const { hashgraphClient } = req.context

  await hashgraphClient.transferToken({
    authorisedAccount: authorisationAccount,
    token: holding.token,
    receiver,
    amount: proposedAmount
  })

  Response.json(res, {
    state: "transfer.success",
    token_id,
    recipient,
    amount
  })

}

export default TransferTransactionHandler
