import useHashgraphContext from "app/context/useHashgraphContext"
import prepare from "app/utils/prepare"
import ExchangeTransactionHandler from "app/handler/exchange/exchangeTransactionHandler";
import withRegisteredAccount from "app/middleware/withRegisteredAccount";
import onlyPost from "app/middleware/onlyPost";

export default prepare(
  onlyPost,
  useHashgraphContext,
  withRegisteredAccount
)(ExchangeTransactionHandler)
