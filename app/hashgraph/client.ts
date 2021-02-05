import {
	PrivateKey,
	AccountCreateTransaction,
	TokenCreateTransaction,
	Hbar,
	TokenInfoQuery
} from "@hashgraph/sdk"
import HashgraphNodeNetwork from "./network"
import TokenService, {AssociateToken, TokenCreation} from "app/hashgraph/tokens";
import Config from "app/config";

class HashgraphClient {
	// Keep a private internal reference to SDK client
	private readonly client

	constructor() {
		this.client = HashgraphNodeNetwork.getNodeNetworkClient()
	}

	/**
	 *	TODO: This method should not be exposed to the outside world. Wrap inside of a private account client.
	 *
	 * @returns {Promise<{accountId: string, privateKey: string, publicKey: string}>}
	 */
	async _createNewAccount() {
		const privateKey = await PrivateKey.generate();
		const publicKey = privateKey.publicKey;
		const client = this.client
		const transaction = new AccountCreateTransaction().setKey(publicKey)
		const txResponse = await transaction.execute(client);
		const receipt = await txResponse.getReceipt(client);
		const accountId = receipt.accountId.toString();

		return {
			accountId,
			privateKey: privateKey.toString(),
			publicKey: publicKey.toString()
		}
	}

	/**
	 * Token related methods
	 *
	 * @param tokenId
	 */
	async singleTokenQuery(tokenId: string) {
		return await TokenService.singleTokenQuery(this.client, tokenId)
	}

	async accountTokenBalance(accountId: string) {
		return await TokenService.accountTokensQuery(this.client, accountId)
	}

	async createToken(tokenCreationInstance: TokenCreation) {
		return await TokenService.createToken(this.client, tokenCreationInstance)
	}

	async associateToAccount(association: AssociateToken) {
		return await TokenService.associateToAccount(this.client, association)
	}
}

export { HashgraphClient }
