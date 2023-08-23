const crypto = require('crypto')
const bcrypt = require('bcrypt')

/**
 * encrypt password
 * @param  {String} plainTextPassword password in plain text for hashing
 * @return {Promise<String>} hashed password
 */
const encryptPsw = async (plainTextPassword) => {
  const firstStage = crypto.createHash('md5').update(plainTextPassword).digest('hex')

  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(firstStage, salt)
}

/**
 * verify password
 * @param  {String} plainTextPassword password in plain text for testing
 * @param  {String} hash password hashing, from db
 * @return {Promise<Boolean>} true if password matches
 */
const comparePsw = async (plainTextPassword, hash) => {
  const firstStage = crypto.createHash('md5').update(plainTextPassword).digest('hex')

  return await bcrypt.compare(firstStage, hash)
}

module.exports = { encryptPsw, comparePsw }
