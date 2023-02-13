const mongoose = require('mongoose')
Schema = mongoose.Schema

const Sharing_Schema = new Schema({
  title: { type: String },
  intro: { type: String },
  YTlink: { type: String },
  otherLinks: [{ type: String }],
  img: {
    data: { type: Buffer },
    contentType: { type: String },
  },
})

const { buf2url } = require('./query')
Sharing_Schema.virtual('imgSrc').get(buf2url('img'))

Sharing_Schema.methods.getPublic = function () {
  const { title, intro, _id, imgSrc, YTlink, otherLinks } = this
  return { title, intro, _id, imgSrc, YTlink, otherLinks }
}

module.exports = mongoose.model('Sharing', Sharing_Schema)
