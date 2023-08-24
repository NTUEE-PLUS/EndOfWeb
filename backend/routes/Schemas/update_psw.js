// * map password in md5 to md5+bcrypt (in the db of URI=process.enc.MONGO_URI)
// ! only for executing once (manually)

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Login = require('./user_login')
const Pending = require('./user_pending')

const env = require('dotenv')
env.config()
const targetUrl = process.env.MONGO_URI

/**
 * encrypt password
 * @param  {String} firstStage md5-hashed password
 * @return {Promise<String>} bcrypt-hashed password
 */
async function appendBcrypt(firstStage) {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(firstStage, salt)
}

/**
 * encrypt password
 * @param  {mongoose.Model<any>} model model
 * @param  {String} path path to userpsw
 * @return {Promise<any>}
 */
async function updatePsw(model, path) {
  const docs = await model.find({}).select('_id ' + path)
  return (
    docs &&
    Promise.all(
      docs.map(async ({ _id, [path]: orginPsw }) => {
        return model.findByIdAndUpdate(_id, { [path]: await appendBcrypt(orginPsw) })
      }),
    )
  )
}
async function main() {
  console.log(`updating at ${targetUrl}`)
  const option = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
  const targetDB = await mongoose.createConnection(targetUrl, option)

  const LoginModel = targetDB.model(Login.collection.collectionName, Login.schema)
  const PendingModel = targetDB.model(Pending.collection.collectionName, Pending.schema)

  await Promise.all([updatePsw(LoginModel, 'userpsw'), updatePsw(PendingModel, 'userpsw')])
  targetDB.close()
}
main()
