import Response from "app/response"
import Request from "app/constants/request"
import denyDelete from "app/middleware/denyDelete"
import denyPut from "app/middleware/denyPut"
import useHashgraphContext from "app/context/useHashgraphContext"
import prepare from "app/utils/prepare"
import CreateAccountHandler from "app/handler/account/createAccountHandler";
import GetAccountHandler from "app/handler/getAccountHandler";

const AccountResourceHandlers = {
	[Request.GET]: GetAccountHandler,
	[Request.POST]: CreateAccountHandler
}

function AccountResource(req, res) {
	const selectHandler = AccountResourceHandlers[req.method]

	if (selectHandler) {
		return selectHandler(req, res)
	}

	// This is the catch all for PATCH and others
	return Response.methodNotAllowed(res, req.method)
}


export default prepare(
	denyPut,
	denyDelete,
	useHashgraphContext
)(AccountResource)
