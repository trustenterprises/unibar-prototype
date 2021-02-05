/**
 * Metamask specific functionality for Unibar
 */

// This is static for now but would be looking to add nonce capability to reduce the risk of replay
const SIGN_UNIBAR_MESSAGE = 'Authorise Unibar 🚀'

export function generateSignature ({
  library,
  account,
  onSuccess = console.log,
  onFailure= console.log
}) {
  library
    .getSigner(account)
    .signMessage(SIGN_UNIBAR_MESSAGE)
    .then((signature: any) => {
      onSuccess({ signature, account })
    })
    .catch((error: any) => {
      onFailure('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))
    })
}

