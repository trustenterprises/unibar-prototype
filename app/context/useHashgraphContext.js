import { HashgraphClient } from "app/hashgraph/client"

function useHashgraphContext(handler) {
	return async (req, res) => {
		const hashgraphClient = new HashgraphClient()

		req.context = {
			...req.context = {},
			hashgraphClient
		}

		return handler(req, res)
	}
}

export default useHashgraphContext
