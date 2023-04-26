const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Recommendation_Schema = new Schema({
  account: { type: String, required: true, unique: true },
  title: {
    type: { type: String, enum: ['intern', 'fulltime', 'both'], required: true },
    title: String,
    name: String,
    desire_work_type: String,
  },
  info: {
    contact: String,
    email: String,
    diploma: String,
  },
  spec: {
    experience: [String],
    speciality: [String],
  },

  img: {
    data: { type: Buffer },
    contentType: { type: String },
  },
  resume: {
    data: { type: Buffer },
    contentType: { type: String },
  },
})

const { buf2url } = require('./query')
Recommendation_Schema.virtual('imgSrc').get(buf2url())
Recommendation_Schema.virtual('resumeSrc').get(buf2url('resume'))

Recommendation_Schema.methods.getPublic = function () {
  return {
    account: this.account,
    _id: this._id,
    title: this.title,
    info: this.info,
    spec: this.spec,
    image: this.imgSrc,
    resume: this.resumeSrc,
  }
}

Recommendation_Schema.statics.smartQuery = function (keywords) {
  if (!keywords) return []
  const reg = new RegExp(keywords.replace(' ', '|'), 'i')
  //   console.log(reg)
  const query = {
    $or: [
      { account: reg },
      { 'title.title': reg },
      { 'title.name': reg },
      { 'title.desire_work_type': reg },
      { 'info.contact': reg },
      { 'info.email': reg },
      { 'info.diploma': reg },
      { 'spec.experience': reg },
      { 'spec.speciality': reg },
    ],
  }
  return query
}

module.exports = mongoose.model('Recommendation', Recommendation_Schema)
