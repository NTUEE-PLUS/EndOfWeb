const { dbCatch, ErrorHandler } = require('../../../error')
const Announcement = require('../../../Schemas/announcement')
const { parseFile } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /announcement/add add announcement
 * @apiName addAnnouncement
 * @apiGroup In/announcement
 * @apiDescription 管理員新增公告
 *
 * @apiParam {String} title 公告標題
 * @apiParam {String} date yyyy/mm/dd
 * @apiParam {String} body 公告內容
 * @apiSuccess (201) {String} successfully add ann
 *
 * @apiError (400) {String} description id is required
 * @apiError (500) {String} description 資料庫錯誤
 */

const addAnn = async (req, res) => {
  const { body, date, title } = req.body
  try {
    await new Announcement({ body, date, title }).save().catch(dbCatch)
    res.status(201).send('successfully add ann')
  } catch (error) {
    res.status(403).send('Encounter error when adding announce: ' + error)
  }
}

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['body', 'date', 'title'],
    type: 'string',
  },
]
module.exports = [valid(rules), asyncHandler(addAnn)]
