/*
 * Basic bcrypt hashing and compare
 */

import bcrypt from "bcryptjs"

function generateSaltedHash (password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function canAuthenticate (password, hash) {
  return bcrypt.compareSync(password, hash);
}

export default {
  generateSaltedHash,
  canAuthenticate
}
