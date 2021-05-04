import associateTokenRequest from "app/validators/token/associateTokenRequest"
import Response from "app/response"

async function AssociateTokenHandler(req, res) {
	const validationErrors = associateTokenRequest(req.body)

	if (validationErrors) {
		return Response.unprocessibleEntity(res, validationErrors)
	}

	const { token_id } = req.body
	const { hashgraphClient } = req.context
	const { hedera_id, private_key } = req.authorisationAccount

	await hashgraphClient.associateToAccount({
		tokenIds: [ token_id ],
		accountId: hedera_id,
		privateKey: private_key
	})

	Response.json(res, {
		state: 'association.success',
		token_id
	})
}

export default AssociateTokenHandler
