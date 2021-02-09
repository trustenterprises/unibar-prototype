/**
 * This class will account management tasks to Unibar.
 *
 * - Creating an account and linking to an ethereum address
 */
import axios from "axios";

/**
 * Creates a new HBAR account for a user and associates with their ethereum account.
 *
 * 1) Send a POST request to /api/account (this creates and stores)
 * 2) Return an address and a SHA256 private key
 *
 * @param account
 * @param signature
 */
export async function createAccount(signature) {
  try {
    const response = await axios.post('api/account', signature)

    // Recoil saving?

  } catch (exception) {

    console.log("Failed to create new account, is this eth address already registered?");
  }
}

/**
 * Return all accounts for a given user, ensure that the signature matches the address.
 *
 * @param account
 * @param signature
 */
export async function getAccounts(signature) {
  try {
    const response = await axios.get('api/account', { params: signature })

    // Recoil saving?
    console.log(response);
  } catch (exception) {

    console.log("Account not found, have you registered?");
  }
}
