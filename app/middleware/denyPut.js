import Request from "app/constants/request"
import Response from "../response"

function denyPut(handler) {
	return async (req, res) => {
		if (req.method === Request.PUT) {
			return Response.methodNotAllowed(res, req.method)
		}

		return handler(req, res)
	}
}

export default denyPut
