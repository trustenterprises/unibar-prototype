const Joi = require("@hapi/joi")

// Possibly add some spec-ness
const schema = Joi.object({
	token_id: Joi.string().required(),
	amount: Joi.string().required(),
}).options({ allowUnknown: true })

function createPoolRequest(candidate = {}) {
	const validation = schema.validate(candidate || {})

	if (validation.error) {
		return validation.error.details.map(error => error.message)
	}
}

export default createPoolRequest
