const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const TeamData_Schema = new Schema({
  name: { type: String, required: true },
  job: { type: String, required: true },
  index: { type: Number, required: true },
  img: {
    data: { type: Buffer },
    contentType: { type: String },
  },
})

const { buf2url } = require('./query')
TeamData_Schema.virtual('imgSrc').get(buf2url())

TeamData_Schema.methods.getPublic = function () {
  return {
    name: this.name,
    _id: this._id,
    job: this.job,
    index: this.index,
    img: this.imgSrc,
  }
}

module.exports = mongoose.model('TeamData', TeamData_Schema)
