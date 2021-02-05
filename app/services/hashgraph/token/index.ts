/**
 * This class will account management tasks to Unibar.
 *
 * - Creating an account and linking to an ethereum address
 */
import axios from "axios";

/**

 */
export async function createToken() {
  try {
    const response = await axios.post('api/token')

    // Recoil saving?

  } catch (exception) {

    console.log("Failed to create new account, is this eth address already registered?");
  }
}

