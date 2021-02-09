import mintTokenRequest from "app/validators/token/mintTokenRequest"
import Response from "app/response"
import TokenData from "app/database/tokens";
import Specification from "app/hashgraph/tokens/specifications";

async function MintTokenHandler(req, res) {
	const validationErrors = mintTokenRequest(req.body)

	if (validationErrors) {
		return Response.unprocessibleEntity(res, validationErrors)
	}

	const {
		symbol,
		name,
		price,
		supply,
		// requires_kyc,
		// can_freeze,
		// linked_token_id // I want to link the price to be pegged to .01 ETH
	} = req.body

	const { hashgraphClient } = req.context
	const { hedera_id, private_key, id } = req.authorisationAccount

	// Need to import specification
	const token = await hashgraphClient.createToken({
		accountId: hedera_id,
		specification: Specification.Fungible,
		privateKey: private_key,
		name,
		symbol,
		price,
		supply
	})

	const stored = await TokenData.storeToken({
		creatorId: id,
		decimals: Specification.Fungible.decimals,
		has_freeze: false,
		has_kyc: false,
		initial_price: price,
		is_synthetic: false,
		spec_ref: Specification.Fungible.reference,
		supply: supply,
		supplyWithDecimals: token.supplyWithDecimals,
		symbol: symbol,
		token_id: token.tokenId,
		asset_contract: undefined
	})

	await TokenData.addHolding({
		tokenId: stored.id,
		amount: token.supplyWithDecimals,
		accountId: id
	})

	Response.json(res, stored)
}

export default MintTokenHandler
