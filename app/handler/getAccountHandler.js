import ensureAccountRequest from "app/validators/ensureAccountRequest"
import Response from "app/response"
import UserData from "app/database/user";

async function GetAccountHandler(req, res) {
	const validationErrors = ensureAccountRequest(req.body)

	if (validationErrors) {
		return Response.unprocessibleEntity(res, validationErrors)
	}

	const { account, signature } = req.query

	const userWithAccounts = await UserData.getUserAndAccounts({
		account,
		signature
	})

	if (userWithAccounts) {
		return Response.json(res, userWithAccounts)
	}

	return Response.resourceNotFound(res)
}

export default GetAccountHandler
