import ensureAccountRequest from "app/validators/ensureAccountRequest"
import Response from "app/response"
import Sodium from "app/utils/sodium";
import Bcrypt from "app/utils/bcrypt";
import UserData from "app/database/user";
import AccountData from "app/database/account";

async function CreateAccountHandler(req, res) {
	const validationErrors = ensureAccountRequest(req.body)

	if (validationErrors) {
		return Response.unprocessibleEntity(res, validationErrors)
	}

	const { account, signature } = req.body

	const hasRegisteredUser = await UserData.hasUserAuth({
		account,
		signature
	})

	if (hasRegisteredUser) {
		// TODO: This needs to be handled in frontend
		console.log("Failed to create account");
		return Response.badRequest(res, ["Unable to create new user account with duplicated ethereum address"])
	}

	const { hashgraphClient } = req.context
	const accountWithKeys = await hashgraphClient._createNewAccount()

	const encrypted = await Sodium.encrypt({
		message: accountWithKeys.privateKey,
		signature
	})

	const hash = Bcrypt.generateSaltedHash(signature)

	const user = await UserData.createUser({
		eth_address: account,
		signature_password: hash
	})

	const hederaAccount = await AccountData.createHederaAccount({
		hedera_id: accountWithKeys.accountId,
		userId: user.id,
		enc_skey: encrypted,
		public_key: accountWithKeys.publicKey
	})

	Response.json(res, hederaAccount)
}

export default CreateAccountHandler
