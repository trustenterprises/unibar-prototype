import Sodium from "app/utils/sodium";
import Config from "app/config";
import PoolData from "app/database/pool";
import {auth} from "google-auth-library";

class ClaimTokensService {

  private readonly hashgraphClient
  private readonly token
  private readonly holding

  // The percent of rewards and
  private readonly percentage

  private readonly authorisationAccount

  // Allow pool transfers
  private pool
  private proxyPoolAccount

  constructor({
    hashgraphClient,
    authorisationAccount,
    proxyPoolAccount,
    pool,
    token,
    holding,
    percentage
  }) {
    this.holding = holding
    this.hashgraphClient = hashgraphClient
    this.authorisationAccount = authorisationAccount
    this.proxyPoolAccount = proxyPoolAccount
    this.pool = pool
    this.token = token
    this.percentage = percentage
  }

  async enablePoolAuthentication() {
    const acc = this.pool.account

    this.pool.account = await this.extractAccountWithPrivateKey(acc)
  }

  async enableProxyAuthentication() {
    const acc = this.proxyPoolAccount

    this.proxyPoolAccount = await this.extractAccountWithPrivateKey(acc)
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

  sendReceiptToProxy() {
    const amountFromPercentage = parseInt(this.holding.amount) / 100 * this.percentage

    return this.hashgraphClient.transferToken({
      authorisedAccount: this.authorisationAccount,
      receiver: this.proxyPoolAccount,
      token: this.token,
      amount: amountFromPercentage
    })
  }

  async sendRewardsToUser() {

    const { holdings } = this.proxyPoolAccount

    const validRewardableTokens = holdings.filter(holding => {
      return holding.token.token_id !== this.token.token_id
    })

    const assocTokens = validRewardableTokens.map(rewardable => rewardable.token.token_id )

    await this.hashgraphClient.associateToAccount({
      tokenIds: assocTokens,
      accountId: this.authorisationAccount.hedera_id,
      privateKey: this.authorisationAccount.private_key
    })

    validRewardableTokens.map(async validRewardableToken => {
      const amountFromPercentage = parseInt(validRewardableToken.amount) / 100 * this.percentage

      await this.hashgraphClient.transferToken({
        authorisedAccount: this.proxyPoolAccount,
        receiver: this.authorisationAccount,
        token: validRewardableToken.token,
        amount: amountFromPercentage
      })
    })

    await Promise.all(validRewardableTokens)

    return assocTokens
  }

  async getTokensFromParentPool() {

    const { holdings } = this.pool.account
    const token = holdings[0]

    const amountFromPercentage = parseInt(token.amount) / 100 * this.percentage

    await this.hashgraphClient.associateToAccount({
      tokenIds: [ token.token.token_id ],
      accountId: this.authorisationAccount.hedera_id,
      privateKey: this.authorisationAccount.private_key
    })

    // Pool sends tokens to holder
    await this.hashgraphClient.transferToken({
      authorisedAccount: this.pool.account,
      receiver: this.authorisationAccount,
      token: token.token,
      amount: amountFromPercentage
    })

    // Update holdings in DB
    await PoolData.updatePoolAmount({
      pool: this.pool,
      amount: amountFromPercentage
    })

    return amountFromPercentage
  }
}

export default ClaimTokensService
