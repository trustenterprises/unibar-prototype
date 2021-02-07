import useHashgraphContext from "app/context/useHashgraphContext"
import prepare from "app/utils/prepare"
import HandleDemoStarburst from "app/handler/demo/handleDemoStarburst";
import onlyPost from "app/middleware/onlyPost";
import withRegisteredAccount from "app/middleware/withRegisteredAccount";

export default prepare(
  onlyPost,
  withRegisteredAccount,
  useHashgraphContext
)(HandleDemoStarburst)
