import Response from "app/response"
import PoolData from "app/database/pool";

async function GetAllPoolsHandler(req, res) {

  const pools = await PoolData.all()

  return Response.json(res, pools)
}

export default GetAllPoolsHandler
