const mongoose = require('mongoose'),
  Schema = mongoose.Schema
require('mongoose-type-email')

const Profile_Schema = new Schema({
  account: { type: String, required: true, lowercase: true },
  username: { type: String, required: true },
  nickname: String,
  advisingProfessor: [{ label: String, value: String }],
  profile: String,
  major: String,
  double_major: String,
  minor: String,
  master: String,
  doctor: String,
  publicEmail: mongoose.SchemaTypes.Email,
  cellphone: String,
  CC: String, //city+country
  web: String,
  facebook: String,
  github: String,
  Linkedin: String,
  Occupation: [
    {
      O: String, //部門
      P: String, //職稱
      C: String, //公司
    },
  ],
  userimage: {
    data: Buffer,
    contentType: String,
  },
})

const { buf2url } = require('./query')
Profile_Schema.virtual('imgSrc').get(buf2url('userimage'))

Profile_Schema.statics.smartQuery = function (keywords) {
  if (!keywords) return []
  const reg = new RegExp(keywords.replace(' ', '|'), 'i')
  const query = {
    $or: [
      { account: reg },
      { username: reg },
      { nickname: reg },
      { advisingProfessor: reg },
      { profile: reg },
      { major: reg },
      { double_major: reg },
      { minor: reg },
      { master: reg },
      { doctor: reg },
      { publicEmail: reg },
      { cellphone: reg },
      { CC: reg },
      { web: reg },
      { facebook: reg },
      { Linkedin: reg },
      { github: reg },
      { 'Occupation.O': reg },
      { 'Occupation.P': reg },
      { 'Occupation.C': reg },
    ],
  }
  return query
}

Profile_Schema.methods.getPublic = function () {
  const {
    _id,
    account,
    username,
    nickname,
    advisingProfessor,
    profile,
    major,
    double_major,
    minor,
    master,
    doctor,
    publicEmail,
    cellphone,
    CC,
    web,
    facebook,
    github,
    Linkedin,
    Occupation,
    imgSrc,
  } = this
  return {
    _id,
    account,
    username,
    nickname,
    advisingProfessor,
    profile,
    major,
    double_major,
    minor,
    master,
    doctor,
    publicEmail,
    cellphone,
    CC,
    web,
    facebook,
    github,
    Linkedin,
    Occupation,
    userimage: imgSrc,
  }
}

module.exports = mongoose.model('Profile', Profile_Schema)
