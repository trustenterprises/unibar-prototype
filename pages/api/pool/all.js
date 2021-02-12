import prepare from "app/utils/prepare"
import GetAllPoolsHandler from "app/handler/pool/getAllPoolHandler";
import onlyGet from "app/middleware/onlyGet";

export default prepare(
  onlyGet
)(GetAllPoolsHandler)
