const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')
const Announcement = require('../../../Schemas/announcement')

/**
 * @api {get} /announcement get announcement
 * @apiName GetAnnouncement
 * @apiGroup In/announcement
 * @apiDescription 拿一筆公告
 *
 * @apiparam {String} _id (required)
 *
 * @apiError (404) {String} description id is required/資料不存在
 * @apiError (500) {String} description 資料庫錯誤
 */
const getAnnouncement = async (req, res, next) => {
  const { _id } = req.query
  const announcement = await Announcement.findOne({ _id }).catch(dbCatch)
  if (!announcement) throw new ErrorHandler(404, '資料不存在')
  return res.status(201).send(announcement)
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'required', field: '_id', method: 'get' }]
module.exports = [valid(rules), asyncHandler(getAnnouncement)]
