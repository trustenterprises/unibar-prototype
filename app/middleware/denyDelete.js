import Request from "app/constants/request"
import Response from "../response"

function denyDelete(handler) {
	return async (req, res) => {
		if (req.method === Request.DELETE) {
			return Response.methodNotAllowed(res, req.method)
		}

		return handler(req, res)
	}
}

export default denyDelete
