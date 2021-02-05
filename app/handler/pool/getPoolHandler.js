import Response from "app/response"
import PoolData from "app/database/pool";
import createPoolRequest from "app/validators/pool/createPoolRequest";

async function GetPoolHandler(req, res) {

  const validationErrors = createPoolRequest(req.query)

  if (validationErrors) {
    return Response.unprocessibleEntity(res, validationErrors)
  }

  const { token_id } = req.query

  const pool = await PoolData.find(token_id)

  if (pool) {
    return Response.json(res, pool)
  }

  return Response.resourceNotFound(res, `Pool with token_id: ${token_id} not found`)
}

export default GetPoolHandler
