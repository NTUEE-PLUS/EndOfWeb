const { dbCatch, ErrorHandler } = require('../../../error')
const AbroadSharing = require('../../../Schemas/abroad_sharing')
const asyncHandler = require('express-async-handler')

/**
 * @api {delete} /deleteAbroadSharing delete AbroadSharing
 * @apiName DeleteAbroadSharing
 * @apiGroup In/abroadSharing
 * @apiDescription 用_id刪除留學分享資訊
 *
 * @apiparam {String} _id 要刪除的
 *
 * @apiSuccess (200) - -
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const deleteAbroadSharing = async (req, res, next) => {
  const { _id } = req.body
  await AbroadSharing.findByIdAndDelete(_id).catch(dbCatch)
  res.status(200).end()
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'required', field: '_id' }]
module.exports = [valid(rules), asyncHandler(deleteAbroadSharing)]
