import {
  PrivateKey,
  AccountBalanceQuery,
  Hbar,
  TokenCreateTransaction,
  TokenInfoQuery,
  TokenAssociateTransaction,
  TransferTransaction
} from "@hashgraph/sdk"
import Config from "app/config"
import { Specification } from "app/hashgraph/tokens/specifications"
import TokenBalanceMap from "@hashgraph/sdk/lib/account/TokenBalanceMap";
import TokenData from "app/database/tokens";
import { ResponseCodeEnum } from "@hashgraph/proto";

export type TokenCreation = {
  specification: Specification;
  accountId: string;
  privateKey: string;
  name: string;
  symbol: string;
  supply: number;
}

export type CreatedTokenReceipt = {
  tokenId: string;
  supply: string;
  supplyWithDecimals: string;
  name: string;
  symbol: string;
  specificationReference: string;
}

export type AccountTokensResult = {
  balance: number;
  tokens: TokenBalanceMap;
}

async function createLiquidityProviderToken () {
  // A token supply is mutable, used for a LP
}

// Question: Is this method good enough for pool functionality
async function createToken(client, tokenCreation: TokenCreation): Promise<CreatedTokenReceipt> {

  const {
    specification,
    accountId,
    privateKey,
    name,
    symbol,
    supply
  } = tokenCreation

  const operatorPrivateKey = PrivateKey.fromString(Config.privateKey)
  const supplyPrivateKey = PrivateKey.fromString(privateKey)
  const supplyWithDecimals = supply * 10 ** specification.decimals

  const transaction = new TokenCreateTransaction()
    .setTokenName(name)
    .setTokenSymbol(symbol)
    .setTreasuryAccountId(accountId)
    .setInitialSupply(supplyWithDecimals)
    .setDecimals(specification.decimals)
    .setFreezeDefault(false)
    .setMaxTransactionFee(new Hbar(30)) //Change the default max transaction fee
    .freezeWith(client);

  const signTx =  await (
    await transaction.sign(operatorPrivateKey)
  ).sign(supplyPrivateKey);

  // const signTx =  await transaction.sign(operatorPrivateKey)
  const txResponse = await signTx.execute(client);
  const receipt = await txResponse.getReceipt(client);

  return {
    name,
    symbol,
    supply: String(supply),
    supplyWithDecimals: String(supplyWithDecimals),
    tokenId: receipt.tokenId.toString(),
    specificationReference: specification.reference
  }
}

async function accountTokensQuery(client, accountId: string): Promise<AccountTokensResult> {
  const { hbars, tokens } = await new AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client)

  return {
    balance: parseInt(hbars.toString()),
    tokens
  }
}

export type AssociateToken = {
  tokenIds: string[];
  accountId: string;
  privateKey: string;
}

// Before transferring token to other account association is require
async function associateToAccount(client, association: AssociateToken) {
  const transaction = await new TokenAssociateTransaction()
    .setAccountId(association.accountId)
    .setTokenIds(association.tokenIds)
    .freezeWith(client);

  const accountPrivateKey = PrivateKey.fromString(association.privateKey)

  const signTx = await transaction.sign(accountPrivateKey);

  return await signTx.execute(client);
}

export type TransferTokenOrder = {
  authorisedAccount: object;
  token: object;
  receiver: object;
  amount: number;
}

// Transfer token to account
async function transferToken(client, {
  authorisedAccount,
  receiver,
  token,
  amount
}: TransferTokenOrder) {

  const transaction = await new TransferTransaction()
    .addTokenTransfer(token.token_id, authorisedAccount.hedera_id, -amount)
    .addTokenTransfer(token.token_id, receiver.hedera_id, amount)
    .freezeWith(client);

  const accountPrivateKey = PrivateKey.fromString(authorisedAccount.private_key)
  const signTx = await transaction.sign(accountPrivateKey);
  const txResponse = await signTx.execute(client);
  const receipt = await txResponse.getReceipt(client);
  const hasTransferredToken = receipt.status._code === ResponseCodeEnum.SUCCESS

  if (!hasTransferredToken) {
    throw new Error("The transfer of tokens did not succeed")
  }

  // Update holding for sender
  await TokenData.adjustHolding({
    amount: -amount,
    tokenId: token.id,
    accountId: authorisedAccount.id
  })

  // Update holding for recipient
  await TokenData.adjustHolding({
    amount: amount,
    tokenId: token.id,
    accountId: receiver.id
  })
}

// Ignore more now, we need to know the name of a token if it is imported.
async function singleTokenQuery(client, tokenId: string) {
  return await new TokenInfoQuery()
    .setTokenId(tokenId)
    .execute(client)
}


export default {
  createToken,
  accountTokensQuery,
  singleTokenQuery,
  associateToAccount,
  transferToken
}
