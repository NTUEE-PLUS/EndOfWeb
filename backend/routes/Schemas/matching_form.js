const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sForm = new Schema({
  name: String,
  degree: String,
  major: [{ type: String }],
  gpa: Number,
  email: String,
  number: Number,
  admissiom: [{ type: String }],
  school: String,
})

const jForm = new Schema({
  name: String,
  degree: String,
  hasPaper: Number,
  major: [{ type: String }],
  gpa: Number,
  email: String,
  account: String,
  school1: String,
  school2: String,
  school3: String,
})

const seniorForm = mongoose.model('seniorForm', sForm)
const juniorForm = mongoose.model('juniorForm', jForm)
module.exports = { seniorForm, juniorForm }
