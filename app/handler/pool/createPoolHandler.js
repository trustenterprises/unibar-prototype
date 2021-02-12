import createPoolRequest from "app/validators/pool/createPoolRequest"
import Response from "app/response"
import PoolData from "app/database/pool";
import TokenData from "app/database/tokens";
import Config from "app/config";
import Sodium from "app/utils/sodium";
import AccountData from "app/database/account";
import prepare from "app/utils/prepare";
import withRegisteredAccount from "app/middleware/withRegisteredAccount";

async function CreatePoolHandler(req, res) {
  const validationErrors = createPoolRequest(req.body)

  if (validationErrors) {
    return Response.unprocessibleEntity(res, validationErrors)
  }

  const {
    token_id,
    name,
    description
  } = req.body

  const token = await TokenData.find(token_id)

  if (!token) {
    return Response.unprocessibleEntity(res, { error: `Token with token_id: ${token_id} does not exist` } )
  }

  const poolExists = await PoolData.find(token_id)

  if (poolExists) {
    return Response.unprocessibleEntity(res, { error:  `Pool with token_id: ${token_id} already exists` })
  }

  const { hashgraphClient } = req.context

  // Create new hedera account
  const accountWithKeys = await hashgraphClient._createNewAccount()

  // Encrypt private key via treasury
  const encrypted = await Sodium.encrypt({
    message: accountWithKeys.privateKey,
    signature: Config.privateKey
  })

  // Store account details
  const account = await AccountData.createHederaAccount({
    hedera_id: accountWithKeys.accountId,
    enc_skey: encrypted,
    public_key: accountWithKeys.publicKey
  })

  const pool = {
    name: name || `${token.symbol} Pool`,
    amount: 0,
    tokenId: token.id,
    accountId: account.id
  }

  // Link account to pool
  await PoolData.createPool(pool)

  // Associate target token to pool
  await hashgraphClient.associateToAccount({
    privateKey: accountWithKeys.privateKey,
    tokenIds: [ token.token_id ],
    accountId: account.hedera_id
  })

  Response.json(res, pool)
}

export default prepare(
  withRegisteredAccount
)(CreatePoolHandler)
