const abroad_sharing = require('../../../Schemas/abroad_sharing')
const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')
/**
 * @api {get} /getallAbroadSharing get allabroadSharing
 * @apiName GetallAbroadSharing
 * @apiGroup In/abroadSharing
 * @apiDescription 拿留學分享資訊
 *
 * @apiSuccess (201) {String} image  圖片
 * @apiSuccess (201) {String} title  標題
 * @apiSuccess (201) {String} intro  介紹
 * @apiSuccess (201) {URL} YTlink youtube連結
 * @apiSuccess (201) {URL} otherLinks 其他連結
 *
 * @apiError (404) {String} description 資料不存在
 * @apiError (500) {String} description 資料庫錯誤
 */
const getallAbroadSharing = async (req, res, next) => {
  const sharing = await abroad_sharing.find({}).catch(dbCatch)
  if (!sharing) throw new ErrorHandler(404, '資料不存在')
  res.status(201).send(sharing)
}
module.exports = asyncHandler(getallAbroadSharing)
