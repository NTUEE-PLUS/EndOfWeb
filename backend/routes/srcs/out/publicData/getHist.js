const { dbCatch } = require('../../../error')
const { History } = require('../../../Schemas/history')
const asyncHandler = require('express-async-handler')

/**
 * @api {get} /history 獲取部長歷史清單
 * @apiName GetHistory
 * @apiGroup In/auth
 * @apiDescription 獲取部長歷史清單
 *
 * @apiparam {} - -
 *
 * @apiSuccess (200) {Object[]} - 歷史資料們
 * @apiSuccess (200) {String} -._id mongodb _id(for update, delete)
 * @apiSuccess (200) {String} -.grade 年級
 * @apiSuccess (200) {String} -.title 標題
 * @apiSuccess (200) {Object[]} -.people 人
 * @apiSuccess (200) {String} -.people.name 名字
 * @apiSuccess (200) {String} -.people.img 照片的 mongodb _id(作為 GET /history/img 的 param)
 *
 * @apiError (500) {String} description 資料庫錯誤
 */

const getHist = async (req, res) => {
  const hists = await History.find().catch(dbCatch)
  res.set({ 'Cache-Control': 'private, max-age=259,200' })
  return res.status(200).send(hists)
}
const valid = require('../../../middleware/validation')
const rules = []

module.exports = [valid(rules), asyncHandler(getHist)]
