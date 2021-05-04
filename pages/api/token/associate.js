import onlyPut from "app/middleware/onlyPut";
import useHashgraphContext from "app/context/useHashgraphContext"
import prepare from "app/utils/prepare"
import AssociateTokenHandler from "app/handler/token/associate/associateTokenHandler";
import withRegisteredAccount from "app/middleware/withRegisteredAccount";

export default prepare(
	onlyPut,
	withRegisteredAccount,
	useHashgraphContext
)(AssociateTokenHandler)
