import Sodium from "app/utils/sodium";
import Config from "app/config";
import PoolData from "app/database/pool";

const STARBURST_SUPER_SADNESS_LIMIT = 8

class ExchangeTransactionService {

  private readonly hashgraphClient
  private readonly token
  private readonly amount
  private readonly authorisationAccount

  // Allow pool transfers
  private pool

  constructor({
    hashgraphClient,
    authorisationAccount,
    pool,
    token,
    amount
  }) {
    this.hashgraphClient = hashgraphClient
    this.authorisationAccount = authorisationAccount
    this.pool = pool
    this.token = token
    this.amount = amount
  }

  async enablePoolAuthentication() {
    const acc = this.pool.account

    this.pool.account = await this.extractAccountWithPrivateKey(acc)
  }

  async extractAccountWithPrivateKey(acc) {
    return {
      ...acc,
      private_key: await Sodium.decrypt({
        signature: Config.privateKey,
        encryptedBase64: acc.enc_skey
      })
    }
  }

  associatePooledTokenToUser() {
    return this.hashgraphClient.associateToAccount({
      tokenIds: [ this.pool.token.token_id ],
      accountId: this.authorisationAccount.hedera_id,
      privateKey: this.authorisationAccount.private_key
    })
  }

  associateTokenToPool() {
    return this.hashgraphClient.associateToAccount({
      tokenIds: [ this.token.token_id ],
      accountId: this.pool.account.hedera_id,
      privateKey: this.pool.account.private_key
    })
  }

  atomicSwap() {
    return this.hashgraphClient.atomicSwap({
      buyerSendState: {
        authorisedAccount: this.authorisationAccount,
        receiver: this.pool.account,
        token: this.token,
        amount: this.amount
      },
      poolSendState: {
        authorisedAccount: this.pool.account,
        receiver: this.authorisationAccount,
        token: this.pool.token,
        amount: this.amount
      }
    })
  }

  updatePoolValue() {
    return PoolData.updatePoolAmount({
      pool: this.pool,
      amount: this.amount
    })
  }

  /**
   * This sends the rewards to the given liquidity reward pools (RLP)
   * 1. Get all RLP pools
   * 2. Calculate positions of each pool
   * 3. Distribute via Starburst transfer (Max 8 token transfer) 🤯
   * 4. Recalculate the RLP balances
   *
   * Later, implement starburst chunking. .... booooooo 🤪
   */
  async rewardPoolDistribution() {
    const rewardPools = this.pool.rewardLiquidityPool
    const total = rewardPools.reduce((acc, pool) => acc + parseInt(pool.amount), 0)

    if (rewardPools.length > STARBURST_SUPER_SADNESS_LIMIT) {
      // TODO: Starburst chunking 🔥 or ask kindly hedera to up limit.
    }

    const rewardDistributions = rewardPools.map(async pool => {

      const account = await this.extractAccountWithPrivateKey(pool.escrowTreasuryAccount.account)

      return {
        total: Math.floor(parseInt(pool.amount) / total * parseInt(this.amount)),
        accountId: pool.escrowTreasuryAccount.accountId,
        account
      }
    })

    const distributions = await Promise.all(rewardDistributions)

    this.hashgraphClient.starburstTransfer({
      authorisedAccount: this.authorisationAccount,
      amount: this.amount,
      token: this.token,
      rewardDistributions: distributions
    })
  }
}

export default ExchangeTransactionService
