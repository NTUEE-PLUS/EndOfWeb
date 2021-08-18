const mongoose = require('mongoose')
const { Schema: columnDetail, collectionName: detailName } = require('./column_detail')
const { Schema: columnOutline, collectionName: outlineName } = require('./column_outline')
const sourceUrl =
    'mongodb+srv://ntueeplus:ntueeplus2020@cluster0.fctiy.mongodb.net/heroku_kbtrwz4h?retryWrites=true&w=majority',
  targetUrl = process.env.MONGO_URI

const copy = async (sourceDB, targetDB, schema, name, async = false) => {
  const sourceModel = sourceDB.model(name, schema)
  const targetModel = targetDB.model(name, schema)
  const docs = await sourceModel.find()
  await targetModel.insertMany(docs, { ordered: async }) //ordered true may run faster(?) but will be unordered
}

const main = async () => {
  if (!targetUrl) throw new Error('MONGO_URI not set in env')
  const sourceDB = await mongoose.createConnection(sourceUrl)
  const targetDB = await mongoose.createConnection(targetUrl)
  targetDB.db.dropDatabase(function (err, res) {
    if (err) return console.log(err)
    console.log('docker DB dropped')
  })
  const task1 = async () => {
    await copy(sourceDB, targetDB, columnDetail, detailName)
  }
  const task2 = async () => {
    await copy(sourceDB, targetDB, columnOutline, outlineName)
  }
  await Promise.all([task1(), task2()])
  mongoose.disconnect()
}
main()
