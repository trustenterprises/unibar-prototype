import Response from "../response"
import hmac from '../utils/hmac'

function checkSignature(handler) {
	return async (req, res) => {
        const { "x-signature" : reqSignature } = req.headers;
        const payloadBody = JSON.stringify(req.body);
        let isValid = hmac.validateSignature(payloadBody, reqSignature)
        if(!isValid) {
            return Response.badRequest(res, "Bad Request")
        }
        return handler(req, res)
	}
}

export default checkSignature
