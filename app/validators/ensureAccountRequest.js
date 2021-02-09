const Joi = require("@hapi/joi")

const schema = Joi.object({
	account: Joi.string().length(42).required(),
	signature: Joi.string().length(132).required(),
}).options({ allowUnknown: true })

/*
 * TODO: This is lacking as their needs to be backend verification of an address
 *  to a signature to a message (A PROD BLOCKER)
 */
function ensureAccountRequest(candidate = {}) {
	const validation = schema.validate(candidate || {})

	if (validation.error) {
		return validation.error.details.map(error => error.message)
	}

	// Verify account and signature here, send validation error.
}

export default ensureAccountRequest
