const mongoose = require('mongoose')
Schema = mongoose.Schema

const Sharing_Schema = new Schema({
  intro: { type: String },
  YTlink: { type: String },
  otherlinks: [{ type: String }],
})

module.exports = mongoose.model('Sharing', Sharing_Schema)
