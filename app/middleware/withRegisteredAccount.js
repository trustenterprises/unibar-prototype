import Language from "app/constants/language"
import Response from "app/response"
import ensureAccountRequest from "app/validators/ensureAccountRequest"
import UserData from "app/database/user";
import Sodium from "app/utils/sodium";

const {
	registeredUserAuth
} = Language.middleware.withAuthenticationResponse

function withRegisteredAccount(handler) {
	return async (req, res) => {

		const validationErrors = ensureAccountRequest(req.body)

		if (validationErrors) {
			return Response.unprocessibleEntity(res, validationErrors)
		}

		const { account, signature } = req.body

		const userAccount = await UserData.hasUserAuth({
			account,
			signature
		})

		if (!userAccount) {
			return Response.unauthorised(res, registeredUserAuth)
		}

		const { accounts } = userAccount

		if (!accounts.length) {
			return Response.badRequest(res, "Unable to use authorised account for requests")
		}

		// For now we are just using the first account for a user
		const acc = accounts[0]

		req.authorisationAccount = {
			...acc,
			private_key: await Sodium.decrypt({
				signature,
				encryptedBase64: acc.enc_skey
			})
		}

		return handler(req, res)
	}
}

export default withRegisteredAccount
