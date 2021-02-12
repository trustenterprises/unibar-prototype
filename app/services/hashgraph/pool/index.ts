import axios from "axios";

/*
 * Pools management, creation, deposit, swap and claim
 */


export async function getPools() {
  try {
    const response = await axios.get('api/pool/all')

    return response.data
  } catch (exception) {
    console.log("Failed to fetch pools");
  }
}


/**
 *
 * @param payload
 * @param onFail
 */
export async function createPool(
  payload,
  onFail = console.log
) {

  try {
    const response = await axios.post('api/pool', payload)

    return response.data

  } catch (error) {

    const responseError = error.response.data?.errors?.error || "Something went wrong"

    onFail(responseError)
  }
}

/**
 *
 * @param payload
 * @param onFail
 */
export async function depositTokenIntoPool(
  payload,
  onFail = console.log
) {

  try {
    const response = await axios.post('api/pool/deposit', payload)

    return response.data

  } catch (error) {

    const responseError = error.response.data?.errors?.error || "Something went wrong"

    onFail(responseError)
  }
}

/**
 *
 * @param payload
 * @param onFail
 */
export async function exchangeSwapTokens(
  payload,
  onFail = console.log
) {

  try {
    const response = await axios.post('api/exchange', payload)

    return response.data

  } catch (error) {

    const responseError = error.response.data?.errors?.error || "Something went wrong"

    onFail(responseError)
  }
}
/**
 *
 * @param payload
 * @param onFail
 */
export async function claimTokenFromPool(
  payload,
  onFail = console.log
) {

  try {
    const response = await axios.post('api/pool/claim', payload)

    return response.data

  } catch (error) {

    const responseError = error.response.data?.errors?.error || "Something went wrong"

    onFail(responseError)
  }
}

