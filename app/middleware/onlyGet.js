import Request from "app/constants/request"
import Response from "../response"

function onlyGet(handler) {
	return async (req, res) => {
		if (req.method === Request.GET) {
			return handler(req, res)
		}

		return Response.methodNotAllowed(res, req.method)
	}
}

export default onlyGet
