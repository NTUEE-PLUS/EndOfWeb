const { dbCatch, ErrorHandler } = require('../../../../error')
const Visual = require('../../../../../routes/Schemas/user_visual_new')
const Login = require('../../../../Schemas/user_login')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /manageAuth add or del admin
 * @apiName manageAuth
 * @apiGroup In/account
 * @apiDescription 新增、刪除管理員
 *
 * @apiparam {String} account 學號
 * @apiparam {Boolean} setAuth true:加成管理員；false:從管理員移除(可以移除自己)
 *
 * @apiSuccess (204) -
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const manage = async (req, res) => {
  const { session_account, setAuth } = req.body
  const vuser = await Visual.findOne({ account: session_account })
  if (!vuser) throw new ErrorHandler(404, 'profile不存在')
  const user = await Login.findOne({ account: session_account }).catch(dbCatch)
  if (!user) throw new ErrorHandler(404, '帳號不存在')

  await Login.updateOne({ account: session_account }, { isAuth: setAuth }).catch(dbCatch)
  return res.status(200).send({
    account: session_account,
    userImage: vuser.imgSrc,
    userName: vuser.username,
    isAuth: user.isAuth,
  })
}

//const valid = require('../../../../middleware/validation')
//const rules = ['account', { filename: 'required', field: 'setAuth', type: 'bool' }]
//valid(rules),
module.exports = asyncHandler(manage)
