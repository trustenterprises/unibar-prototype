import createPoolRequest from "app/validators/pool/createPoolRequest"
import Response from "app/response"
import TokenData from "app/database/tokens";
import PoolData from "../../database/pool";

async function DepositTokenPoolHandler(req, res) {
  const validationErrors = createPoolRequest(req.body)

  if (validationErrors) {
    return Response.unprocessibleEntity(res, validationErrors)
  }

  const {
    token_id
  } = req.body

  const token = await TokenData.find(token_id)

  if (!token) {
    return Response.badRequest(res, { error: `Token with token_id: ${token_id} does not exist` } )
  }

  const poolExists = await PoolData.find(token.id)

  if (!poolExists) {
    return Response.badRequest(res, { error:  `Pool with token_id: ${token_id} already exists` })
  }

  /**
   * Depositing a token
   *
   * 1. The token needs to exist
   * 2. The pool needs to exist
   * 3. The token and amount needs to exist in users holdings
   * 4. The token needs to be transferred to the pool
   * 5. A deposit reward pool needs to be created with token preferences
   */



  //
  // const poolExists = await PoolData.find(token.id)
  //
  // if (poolExists) {
  //   return Response.badRequest(res, { error:  `Pool with token_id: ${token_id} already exists` })
  // }
  //
  // const { hashgraphClient } = req.context
  // const accountWithKeys = await hashgraphClient._createNewAccount()
  //
  // const encrypted = await Sodium.encrypt({
  //   message: accountWithKeys.privateKey,
  //   signature: Config.privateKey
  // })
  //
  // const account = await AccountData.createHederaAccount({
  //   hedera_id: accountWithKeys.accountId,
  //   enc_skey: encrypted,
  //   public_key: accountWithKeys.publicKey
  // })
  //
  // await PoolData.createPool({
  //   name: `${token.symbol} Pool`,
  //   amount: 0,
  //   tokenId: token.id,
  //   accountId: account.id
  // })
  //
  // await hashgraphClient.associateToAccount({
  //   privateKey: accountWithKeys.privateKey,
  //   tokenIds: [ token.token_id ],
  //   accountId: account.hedera_id
  // })

  Response.json(res, "ok")
}

export default DepositTokenPoolHandler
