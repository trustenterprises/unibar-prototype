import Response from "app/response"
import Request from "app/constants/request"
import denyDelete from "app/middleware/denyDelete"
import denyPut from "app/middleware/denyPut"
import useHashgraphContext from "app/context/useHashgraphContext"
import prepare from "app/utils/prepare"
import MintTokenHandler from "app/handler/token/mintTokenHandler";
import withRegisteredAccount from "app/middleware/withRegisteredAccount";

const TokenResourceHandlers = {
	// [Request.GET]: GetAccountHandler,
	[Request.POST]: MintTokenHandler
}

function TokenResource(req, res) {
	const selectHandler = TokenResourceHandlers[req.method]

	if (selectHandler) {
		return selectHandler(req, res)
	}

	// This is the catch all for PATCH and others
	return Response.methodNotAllowed(res, req.method)
}


export default prepare(
	denyPut,
	denyDelete,
	withRegisteredAccount,
	useHashgraphContext
)(TokenResource)
