/*
 * Sodium encryption and decryption
 *
 * For the Hackathon Unibar is going to be more of a centralized model for account and key
 * management. Encrypted private keys are stored in the database, these can only be decrypted
 * using a signed signature from a Metamask client.
 *
 */

import { CryptographyKey, SodiumPlus } from "sodium-plus";
import Crypto from "crypto";
import Config from "app/config"

// In production this would be incremented for every user for every tx
function staticNonce () {
  return Buffer.from(Config.staticNonce, 'base64')
}

// Generate a hashed signature key to encrypt the message or private key
async function generateSignatureKey (signature) {
  const hash = await Crypto.createHash('sha256').update(signature).digest();

  return new CryptographyKey(hash);
}

async function encrypt ({
  message,
  signature
}) {
  const nonce = staticNonce()
  const sodium = await SodiumPlus.auto();
  const key = await generateSignatureKey(signature)
  const ciphertext = await sodium.crypto_secretbox(message, nonce, key)

  return ciphertext.toString('base64')
}

async function decrypt ({
  encryptedBase64,
  signature
}) {
  const nonce = staticNonce()
  const sodium = await SodiumPlus.auto();
  const key = await generateSignatureKey(signature)
  const ciphertext = Buffer.from(encryptedBase64, 'base64')
  const decrypted = await sodium.crypto_secretbox_open(ciphertext, nonce, key);

  return decrypted.toString('utf-8')
}

export default {
  decrypt,
  encrypt
}
