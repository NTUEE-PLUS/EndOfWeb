//srcs/chLogin.js
const { dbCatch, ErrorHandler } = require('../../../error')
const { encryptPsw, comparePsw } = require('../../../encrypt')
const Login = require('../../../Schemas/user_login')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /chPassword reset password
 * @apiName chPassword
 * @apiGroup In/account
 * @apiDescription 重設密碼
 *
 * @apiparam {String} oldPsw 原本密碼
 * @apiparam {String} newPsw 新密碼
 *
 * @apiSuccess (204) -
 *
 * @apiError (401) {String} description 原始密碼錯誤
 * @apiError (404) {String} description 帳號不存在
 * @apiError (500) {String} description 資料庫錯誤
 */
const chPsw = async (req, res, next) => {
  const session_account = req.session.loginAccount

  let { oldPsw, newPsw } = req.body

  const obj = await Login.findOne({ account: session_account }).catch(dbCatch)
  if (!obj) throw new ErrorHandler(404, '帳號不存在')
  if (!(await comparePsw(oldPsw, obj.userpsw))) throw new ErrorHandler(401, '原始密碼錯誤')

  const newPswHash = await encryptPsw(newPsw)

  await Login.updateOne({ account: session_account }, { $set: { userpsw: newPswHash } }).catch(
    dbCatch,
  )
  return res.status(204).end()
}

const valid = require('../../../middleware/validation')

const rules = [
  { filename: 'password', field: 'oldPsw' },
  { filename: 'password', field: 'newPsw' },
]
module.exports = [valid(rules), asyncHandler(chPsw)]
