const mongoose = require('mongoose')
const models = [
  // require('./abroad_info'),
  // require('./abroad_sharing'),
  // require('./column_detail'),
  // require('./column_outline'),
  require('./history').History,
  require('./history').HistImg,
  // require('./matching_form').juniorForm,
  // require('./matching_form').seniorForm,
  require('./team_data'),
]
const env = require('dotenv')
const crypto = require('crypto')
env.config()
const sourceUrl = process.env.MONGO_URL
const targetUrl = process.env.MONGO_URI
if (!sourceUrl || !targetUrl) throw new Error('MONGO_URI or MONGO_URL not given')

const copy = async (sourceDB, targetDB, schema, name, ordered = true) => {
  const sourceModel = sourceDB.model(name, schema)
  const targetModel = targetDB.model(name, schema)
  const docs = await sourceModel.find()
  console.log(`${docs.length} ${name} docs found`)
  await targetModel.insertMany(docs, { ordered }) //ordered true may run faster(?) but will be unordered
  console.log(`insert ${name} complete`)
}
const addAuth = async (targetDB) => {
  const User = targetDB.model('User_login', require('./user_login').schema)
  const UserVisual = targetDB.model('Profile', require('./user_visual_new').schema)
  const admin = await User.findOne({ account: process.env.ADMIN_ACCOUNT })
  console.log('admin:', admin)
  console.log('admin account:', process.env.ADMIN_ACCOUNT)
  if (!admin) {
    const adminVisual = await UserVisual.insertMany(
      [
        {
          username: 'admin',
          account: process.env.ADMIN_ACCOUNT,
        },
      ],
      { order: true },
    )
    console.log('admin visual:', adminVisual[0]._id)
    const newPsw = crypto.createHash('md5').update(process.env.ADMIN_PASSWORD).digest('hex')
    await User.insertMany([
      {
        username: 'admin',
        account: process.env.ADMIN_ACCOUNT,
        userpsw: newPsw,
        isAuth: true,
        visual: adminVisual[0]._id,
      },
    ]).catch((err) => console.log(err))
    console.log('admin added')
  }
}
const main = async () => {
  console.log(`saving to ${targetUrl}`)
  const option = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  const sourceDB = await mongoose.createConnection(sourceUrl, option)
  const targetDB = await mongoose.createConnection(targetUrl, option)
  const dp = new Promise((resolve, reject) => {
    targetDB.db.dropDatabase(function (err, res) {
      if (err) reject(err)
      console.log('target DB drop success')
      resolve()
    })
  })
  await dp
  const tasks = models.map((model) => {
    const collectionName = model.collection.collectionName
    const Schema = model.schema
    return copy(sourceDB, targetDB, Schema, collectionName)
  })
  await Promise.all(tasks)
  await addAuth(targetDB)
  sourceDB.close()
  targetDB.close()
}
main()
