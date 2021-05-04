import Request from "app/constants/request"
import Response from "../response"

function onlyPut(handler) {
	return async (req, res) => {
		if (req.method === Request.PUT) {
			return handler(req, res)
		}

		return Response.methodNotAllowed(res, req.method)
	}
}

export default onlyPut
