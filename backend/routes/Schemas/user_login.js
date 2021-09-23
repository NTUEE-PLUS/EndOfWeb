const mongoose = require('mongoose'),
  Schema = mongoose.Schema
const env = require('dotenv')
env.config()

const exportVersion = (v) => {
  switch (v) {
    case 'true':
      return new Schema({
        username: { type: String, required: true }, //名字
        facebookID: String,
        account: { type: String, required: true, lowercase: true }, //學號
        userpsw: String, //密碼
        isAuth: { type: Boolean, default: false },
        visual: { type: Schema.Types.ObjectId, ref: 'User_visual' },
      })
    case 'version3':
      return new Schema({
        username: { type: String, required: true }, //名字
        facebookID: String,
        account: { type: String, required: true, lowercase: true }, //學號
        userpsw: String, //密碼
        isAuth: { type: Boolean, default: false },
        isActivated: { type: Boolean, default: false },
        visual: { type: Schema.Types.ObjectId, ref: 'User_visual' },
        img: {
          data: { type: Buffer },
          contentType: { type: String },
        },
      })
    default:
      return new Schema({
        username: { type: String, required: true }, //名字
        facebookID: String,
        account: { type: String, required: true, lowercase: true }, //學號
        userpsw: String, //密碼
        isAuth: { type: Boolean, default: false },
        visual: { type: Schema.Types.ObjectId, ref: 'User_visual' },
        img: {
          data: { type: Buffer },
          contentType: { type: String },
        },
      })
  }
}

const User_login_Schema = exportVersion(process.env.newReg)

const { buf2url } = require('./query')
User_login_Schema.virtual('imgSrc').get(buf2url())

module.exports = mongoose.model('User_login', User_login_Schema)
