const abroad_sharing = require('../../../Schemas/abroad_sharing')
const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')
/**
 * @api {get} /getAbroadSharingImg get specific image
 * @apiName GetAbroadSharingImg
 * @apiGroup In/abroadSharing
 * @apiDescription 拿留學分享資訊圖片
 *
 * @apiSuccess (201) {String} imgSrc  圖片
 *
 * @apiError (403) {String} description please provide _id
 * @apiError (404) {String} description 資料不存在
 * @apiError (500) {String} description 資料庫錯誤
 */
const getAbroadSharingImg = async (req, res, next) => {
  const { _id } = req.query
  if (!_id) throw new ErrorHandler(403, 'please provide _id')
  const sharing = await abroad_sharing.findOne({ _id }).select('img').catch(dbCatch)
  if (!sharing) throw new ErrorHandler(404, '資料不存在')
  res.set({ 'Cache-Control': 'private, max-age=2592000' })
  res.status(201).send(sharing.getPublic())
}
const valid = require('../../../middleware/validation')
const rules = [{ filename: 'required', field: '_id', method: 'get' }]
module.exports = [valid(rules), asyncHandler(getAbroadSharingImg)]
