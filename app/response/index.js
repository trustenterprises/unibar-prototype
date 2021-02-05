import Language from "app/constants/language"
import Status from "app/constants/status"

const { notAllowed } = Language.middleware.onlyPostResponse

function methodNotAllowed(res, method) {
	return res
		.status(Status.METHOD_NOT_ALLOWED)
		.send({ reason: notAllowed(method) })
}

function unauthorised(res, reason) {
	return res.status(Status.UNAUTHORIZED).send({ reason })
}

function resourceNotFound(res, errors) {
	return res.status(Status.NOT_FOUND).send({ errors })
}

function unprocessibleEntity(res, errors) {
	return res.status(Status.UNPROCESSIBLE_ENTITY).send({ errors })
}

function badRequest(res) {
	return res.status(Status.BAD_REQUEST).send({})
}

function json(res, data) {
	res.json({ data })
}

export default {
	methodNotAllowed,
	unauthorised,
	resourceNotFound,
	unprocessibleEntity,
	badRequest,
	json
}
