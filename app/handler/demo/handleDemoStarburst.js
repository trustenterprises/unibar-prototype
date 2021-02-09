import Response from "app/response"
import Specification from "app/hashgraph/tokens/specifications";
import { PrivateKey, TransferTransaction } from "@hashgraph/sdk";
import HashgraphNodeNetwork from "app/hashgraph/network";

const tokenId = '0.0.306544'
const MAX_ACCOUNTS = 8
const MAX_SEND = 100000000

const accountsBatched = [
	[
		'0.0.306592',
		'0.0.306594',
		'0.0.306596',
		'0.0.306593',
		'0.0.306595',
		'0.0.306597',
		'0.0.306599',
		'0.0.306598',
		'0.0.306599'
	],
	[
		'0.0.306614',
		'0.0.306616',
		'0.0.306618',
		'0.0.306620',
		'0.0.306613',
		'0.0.306615',
		'0.0.306617',
		'0.0.306619'
	],
	[
		'0.0.306626',
		'0.0.306628',
		'0.0.306625',
		'0.0.306627',
		'0.0.306629',
		'0.0.306630',
		'0.0.306632',
		'0.0.306631'
	],
	[
		'0.0.306638',
		'0.0.306640',
		'0.0.306637',
		'0.0.306639',
		'0.0.306641',
		'0.0.306642',
		'0.0.306644',
		'0.0.306643'
	],
	[
		'0.0.306654',
		'0.0.306653',
		'0.0.306655',
		'0.0.306648',
		'0.0.306650',
		'0.0.306652',
		'0.0.306649',
		'0.0.306651'
	]
]

async function createDemoToken ({ context, authorisationAccount }) {
	return await context.hashgraphClient.createToken({
		accountId: authorisationAccount.hedera_id,
		specification: Specification.Fungible,
		privateKey: authorisationAccount.private_key,
		name: "SUPER DUPER STARBURST DEMO",
		symbol: "STARBURST DEMO",
		price: 0,
		supply: 10000000000
	})
}

async function createAccountsWithAssociation({ hashgraphClient }) {
	const accounts = []

	const newAccountWithAssoc = async () => {
		const accountWithKeys = await hashgraphClient._createNewAccount()
		const account = {
			tokenIds: [ tokenId ],
			accountId: accountWithKeys.accountId,
			privateKey: accountWithKeys.privateKey
		}

		await hashgraphClient.associateToAccount(account)

		accounts.push(accountWithKeys.accountId)

		console.log(accounts.length);
	}

	const tasks = []

	for (let i = 0; i < MAX_ACCOUNTS; i++) {
		tasks.push(newAccountWithAssoc())
	}

	await Promise.all(tasks);

	console.log(accounts);
}

/**
 * NOTE:: This should only be run locally.
 *
 * The starburst function is a demo which simulates the network effects of
 * a buyer of tokens from a pool, and for all of those token to be distributed
 * to all lidiquity participants that are accepting "STARBURST DEMO" as payment.
 *
 * In this case we are simply just generating "n" accounts with a coin that has been
 * generated, associated then equally distributed to all liquidity providers.
 *
 * Create an issue: TOKEN_TRANSFER_LIST_SIZE_LIMIT_EXCEEDED
 *
 * Ongoing: https://github.com/hashgraph/hedera-services/issues/1063
 */
async function HandleDemoStarburst(req, res) {

	//  Live, life, love.
	return Response.unprocessibleEntity(res, 'NAUGHTY NAUGHTY')

	// For local
	const { hedera_id, private_key } = req.authorisationAccount
	const accounts = []
	const accountPrivateKey = PrivateKey.fromString(private_key)
	const client = HashgraphNodeNetwork.getNodeNetworkClient()

	const batchTransfer = async (accounts) => {
		const transaction = await new TransferTransaction()
			.addTokenTransfer(tokenId, hedera_id, -(MAX_SEND / 5))

		accounts.forEach(account => {
			transaction.addTokenTransfer(tokenId, account, MAX_SEND / 40)
		})

		transaction.freezeWith(client);

		const signTx = await transaction.sign(accountPrivateKey);
		const txResponse = await signTx.execute(client);

		await txResponse.getReceipt(client);
	}

	const tasks = []

	accountsBatched.forEach(accounts => {
		tasks.push(batchTransfer(accounts))
	})

	await Promise.all(tasks)

	Response.json(res, {
		accounts,
	})
}

export default HandleDemoStarburst
