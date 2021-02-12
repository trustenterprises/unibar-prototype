import PoolData from "app/database/pool";
import TokenData from "app/database/tokens";
import AccountData from "app/database/account";
import Sodium from "app/utils/sodium";
import Config from "app/config";
import Specification from "app/hashgraph/tokens/specifications";

class DepositTokenService {

  private readonly hashgraphClient
  private readonly authorisationAccount
  private readonly pool
  private readonly token

  constructor({
    hashgraphClient,
    authorisationAccount,
    pool,
    token
  }) {
    this.hashgraphClient = hashgraphClient
    this.authorisationAccount = authorisationAccount
    this.pool = pool
    this.token = token
  }

  // Possibly use exists or count
  checkForRewardLiquidityPoolExists() {
    return PoolData.getRewardLiquidityPool({
      account: this.authorisationAccount,
      pool: this.pool
    })
  }

  getUserTokenHolding() {
    return TokenData.getUserTokenHolding({
      tokenId: this.token.id,
      accountId: this.authorisationAccount.id,
      amount: ""
    })
  }

  transferTokensToPool(proposedAmount) {
    return this.hashgraphClient.transferToken({
      authorisedAccount: this.authorisationAccount,
      receiver: this.pool.account,
      token: this.token,
      amount: proposedAmount
    })
  }

  updatePoolValue(proposedAmount) {
    return PoolData.depositToPool({
      pool: this.pool,
      amount: proposedAmount
    })
  }

  async createNewRewardPoolAccount() {
    // Rewards will be sent to this pool
    const proxyLiquidityPool = await this.hashgraphClient._createNewAccount()

    // Encrypt private key via treasury
    const encrypted = await Sodium.encrypt({
      message: proxyLiquidityPool.privateKey,
      signature: Config.privateKey
    })

    // Store account details
    const account = await AccountData.createHederaAccount({
      userId: undefined,
      hedera_id: proxyLiquidityPool.accountId,
      enc_skey: encrypted,
      public_key: proxyLiquidityPool.publicKey
    })

    return {
      proxyLiquidityPool,
      account
    }
  }

  async createLpToken({
    proxyLiquidityPool,
    account,
    amount,
    proposedAmount
  }) {

    const lpToken = await this.hashgraphClient.createToken({
      accountId: proxyLiquidityPool.accountId,
      specification: Specification.Fungible,
      privateKey: proxyLiquidityPool.privateKey,
      name: `${this.token.symbol} LP RECEIPT`,
      symbol: `${this.token.symbol}:LP:RECEIPT`,
      price: 0,
      supply: amount
    })

    const stored = await TokenData.storeToken({
      creatorId: account.id,
      decimals: Specification.Fungible.decimals,
      has_freeze: false,
      has_kyc: false,
      initial_price: 0,
      is_synthetic: false,
      spec_ref: Specification.UnibarLiquidityProviderReceipt.reference,
      supply: amount,
      supplyWithDecimals: String(proposedAmount),
      symbol: `${this.token.symbol}:LP:RECEIPT`,
      token_id: lpToken.tokenId,
      asset_contract: undefined
    })

    await TokenData.addHolding({
      tokenId: stored.id,
      amount: String(proposedAmount),
      accountId: account.id
    })

    await this.hashgraphClient.associateToAccount({
      tokenIds: [ stored.token_id ],
      accountId: this.authorisationAccount.hedera_id,
      privateKey: this.authorisationAccount.private_key
    })

    return stored
  }

  createRewardLiquidityPool({
    account,
    proposedAmount
  }) {
    return PoolData.createRewardLiquidityPool({
      depositeeAccount: this.authorisationAccount,
      escrowAccount: account,
      pool: this.pool,
      price: 0,
      amount: proposedAmount
    })
  }

  transferLpTokenToDepositee({
    proposedAmount,
    stored,
    proxyLiquidityPool,
    account,
  }) {
    return this.hashgraphClient.transferToken({
      authorisedAccount: {
        ...account,
        private_key: proxyLiquidityPool.privateKey,
        token_id: stored.hedera_id
      },
      receiver: this.authorisationAccount,
      token: stored,
      amount: proposedAmount
    })
  }


}

export default DepositTokenService
