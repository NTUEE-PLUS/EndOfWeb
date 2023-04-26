const { dbCatch, ErrorHandler } = require('../../../error')
const Announcement = require('../../../Schemas/announcement')
const { updateQuery, parseFile } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

const updateAnnouncement = async (req, res, next) => {
  const { title, date, body, _id } = req.body
  const toUpdate = await Announcement.findById(_id, '_id').catch(dbCatch)
  if (!toUpdate) throw new ErrorHandler(404, '_id not exists')
  const keys = {
    title,
    date,
    body,
  }
  const toSet = updateQuery(keys)

  await Announcement.findByIdAndUpdate(req.body._id, toSet).catch(dbCatch)
  res.status(203).end()
}

/**
 * @api {patch} /announcement update announcement
 * @apiName UpdateAnnouncement
 * @apiGroup In/announcement
 * @apiDescription 更新一筆公告
 *
 * @apiparam {String} _id 要更新公告的mongodb _id
 * @apiparam {String} title 公告標題(optional)
 * @apiparam {String} body 公告內容(optional)
 * @apiparam {String} date 公告時間(optional)
 *
 * @apiSuccess (203) - -
 *
 * @apiError (404) {String} description _id not exists
 * @apiError (500) {String} description 資料庫錯誤
 */

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['title', 'body', 'date'],
    type: 'string',
  },
  { filename: 'required', field: '_id', type: 'string' },
]
module.exports = [valid(rules), asyncHandler(updateAnnouncement)]
