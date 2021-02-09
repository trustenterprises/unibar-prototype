import Response from "app/response"
import Request from "app/constants/request"
import denyDelete from "app/middleware/denyDelete"
import denyPut from "app/middleware/denyPut"
import useHashgraphContext from "app/context/useHashgraphContext"
import prepare from "app/utils/prepare"
import DepositTokenPoolHandler from "app/handler/pool/depositTokenPoolHandler";
import withRegisteredAccount from "app/middleware/withRegisteredAccount";

const DepositPoolResourceHandlers = {
  // [Request.GET]: GetAccountHandler,

  // To deposit new tokens into a pool
  [Request.POST]: DepositTokenPoolHandler

  // Check my current deposits in
}

function DepositPoolResource(req, res) {
  const selectHandler = DepositPoolResourceHandlers[req.method]

  if (selectHandler) {
    return selectHandler(req, res)
  }

  // This is the catch all for PATCH and others
  return Response.methodNotAllowed(res, req.method)
}


export default prepare(
  denyPut,
  denyDelete,
  withRegisteredAccount,
  useHashgraphContext
)(DepositPoolResource)
