const { dbCatch, ErrorHandler } = require('../../../../error')
const Visual = require('../../../../Schemas/user_visual_new')
const Login = require('../../../../Schemas/user_login')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /delUser delete user
 * @apiName delUser
 * @apiGroup In/account
 * @apiDescription 刪除使用者
 *
 * @apiparam {String} account 帳號
 *
 * @apiSuccess (200) {String} account account
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const deleteUser = async (req, res, next) => {
  const { account } = req.body
  await Visual.deleteOne({ account }).catch(dbCatch)
  await Login.deleteOne({ account }).catch(dbCatch)
  return res.send({ account })
}

const valid = require('../../../../middleware/validation')
const rules = ['account']
module.exports = [valid(rules), asyncHandler(deleteUser)]
