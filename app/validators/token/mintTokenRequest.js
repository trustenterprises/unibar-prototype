const Joi = require("@hapi/joi")

const TRILLION = 10 ** 12

// Possibly add some spec-ness
const schema = Joi.object({
	symbol: Joi.string().max(100).required(),
	name: Joi.string().max(100).required(),
	price: Joi.number().precision(6).positive().required(),
	supply: Joi.number().positive().max(TRILLION).min(1).required(),
	requires_kyc: Joi.bool().default(false),
	can_freeze: Joi.bool().default(false),
	linked_token_id: Joi.number().optional() // Link to a synthetic asset
}).options({ allowUnknown: true })

function mintTokenRequest(candidate = {}) {
	const validation = schema.validate(candidate || {})

	if (validation.error) {
		return validation.error.details.map(error => error.message)
	}
}

export default mintTokenRequest
