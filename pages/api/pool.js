import Response from "app/response"
import Request from "app/constants/request"
import denyDelete from "app/middleware/denyDelete"
import denyPut from "app/middleware/denyPut"
import useHashgraphContext from "app/context/useHashgraphContext"
import prepare from "app/utils/prepare"
import GetPoolHandler from "app/handler/pool/getPoolHandler";
import CreatePoolHandler from "app/handler/pool/createPoolHandler";

const PoolResourceHandlers = {
	[Request.GET]: GetPoolHandler,
	[Request.POST]: CreatePoolHandler
}

function PoolResource(req, res) {
	const selectHandler = PoolResourceHandlers[req.method]

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
)(PoolResource)
