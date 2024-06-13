const mongoose = require('mongoose')
Schema = mongoose.Schema

const Sharing_Schema = new Schema(
  {
    title: { type: String },
    category: { type: String },
    intro: { type: String },
    YTlink: { type: String },
    otherLinks: [{ link: { type: String }, desc: { type: String } }],
    img: {
      data: { type: Buffer },
      contentType: { type: String },
    },
  },
  { timestamps: true },
)

const { buf2url } = require('./query')
Sharing_Schema.virtual('imgSrc').get(buf2url('img'))

Sharing_Schema.methods.getPublic = function () {
  const { title, category, intro, _id, imgSrc, YTlink, otherLinks, updatedAt } = this
  return { title, category, intro, _id, imgSrc, YTlink, otherLinks, updatedAt }
}

module.exports = mongoose.model('Sharing', Sharing_Schema)
