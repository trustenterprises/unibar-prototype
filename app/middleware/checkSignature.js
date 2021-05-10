import Response from "../response"
import hmac from '../utils/hmac'

function checkSignature(handler) {
	return async (req, res) => {
        try {
            const { "x-signature" : requsetSignature } = req.headers;
            const payloadAsString = JSON.stringify(req.body);
            let isValid = hmac.validateSignature(payloadAsString, requsetSignature)
            if(!isValid) {
                return Response.badRequest(res, "Bad Request")
            }
        } catch (error) {
            return Response.badRequest(res, "Bad Request")
        }
        return handler(req, res)
	}
}

export default checkSignature
