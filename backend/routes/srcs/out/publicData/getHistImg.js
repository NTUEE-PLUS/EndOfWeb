const { dbCatch, ErrorHandler } = require('../../../error')
const { HistImg } = require('../../../Schemas/history')
const asyncHandler = require('express-async-handler')

/**
 * @api {get} /history/img 獲取部長(歷史清單中的)圖片
 * @apiName GetHistoryImage
 * @apiGroup In/auth
 * @apiDescription 獲取部長(歷史清單中的)圖片
 *
 * @apiparam {String} _id? mongodb的_id
 *
 * @apiSuccess (200) {File} - 照片(dataURL)
 *
 * @apiError (500) {String} description 資料庫錯誤
 */

const getHistImg = async (req, res) => {
  const { _id } = req.query
  const img = await HistImg.findById(_id).catch(dbCatch)
  if (!img) throw new ErrorHandler(404, '_id not found')
  res.set({ 'Cache-Control': 'private, max-age=604800' })
  return res.status(200).send(img.getPublic())
}
const valid = require('../../../middleware/validation')
const rules = [{ filename: 'required', field: ['_id'], type: 'string', method: 'get' }]

module.exports = [valid(rules), asyncHandler(getHistImg)]
