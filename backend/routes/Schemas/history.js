const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const History_Schema = new Schema({
  grade: { type: String, required: true },
  title: { type: String, required: true },
  people: [
    {
      img: {
        type: Schema.Types.ObjectId,
        ref: 'HistImg',
      },
      name: { type: String, required: true },
    },
  ],
})

const HistoryImage_Schema = new Schema({
  data: { type: Buffer },
  contentType: { type: String },
})

const { buf2url } = require('./query')
HistoryImage_Schema.virtual('imgSrc').get(function () {
  const BtoU = buf2url()
  return BtoU.apply({ img: this })
})
HistoryImage_Schema.methods.getPublic = function () {
  return this.imgSrc
}

const HistImg = mongoose.model('HistImg', HistoryImage_Schema)
const History = mongoose.model('History', History_Schema)
module.exports = { HistImg, History }
