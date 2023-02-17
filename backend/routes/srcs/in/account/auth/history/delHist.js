const { dbCatch, ErrorHandler } = require('../../../../../error')
const { History, HistImg } = require('../../../../../Schemas/history')
const asyncHandler = require('express-async-handler')

/**
 * @api {delete} /history 刪除年級(部長歷史清單)
 * @apiName DeleteHistory
 * @apiGroup In/auth
 * @apiDescription 刪除年級(部長歷史清單)
 *
 * @apiparam {String} _id get或add時回傳的_id
 *
 * @apiSuccess (200) grade grade
 *
 * @apiError (404) {String} description not valid _id
 * @apiError (500) {String} description 資料庫錯誤
 */

const delHist = async (req, res) => {
  const { _id } = req.query
  const data = await History.findById(_id, ['people', 'grade']).catch(dbCatch)
  if (!data) throw new ErrorHandler(404, '_id not found')

  await Promise.all(data.people.map(({ img }) => HistImg.findByIdAndDelete(img)))
  await History.findByIdAndDelete(_id).catch(dbCatch)

  return res.status(200).send({ grade: data.grade })
}
const valid = require('../../../../../middleware/validation')
const rules = [{ filename: 'required', field: ['_id'], type: 'string', method: 'delete' }]

module.exports = [valid(rules), asyncHandler(delHist)]
