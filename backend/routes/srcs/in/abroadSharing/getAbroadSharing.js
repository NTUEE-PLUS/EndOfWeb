const abroad_sharing = require('../../../Schemas/abroad_sharing')
const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')
/**
 * @api {get} /getAbroadSharing get abroadSharing
 * @apiName GetAbroadSharing
 * @apiGroup In/abroadSharing
 * @apiDescription 拿留學分享資訊
 *
 * @apiSuccess (201) {String} intro  介紹
 * @apiSuccess (201) {String} YTlink youtube連結
 * @apiSuccess (201) {String} otherlinks 其他連結
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const getAbroadSharing = async (req, res, next) => {
  const sharing = await abroad_sharing.find({}).catch(dbCatch)
  res.status(201).send(sharing)
}
module.exports = asyncHandler(getAbroadSharing)
