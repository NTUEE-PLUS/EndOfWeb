const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')
const Announcement = require('../../../Schemas/announcement')

/**
 * @api {get} /announcement/recent get recent announcement
 * @apiName RecentAnnouncement
 * @apiGroup In/recent
 * @apiDescription 拿Announcement資料
 *
 * @apiParam {Number} amount=5
 *
 * @apiSuccess (201) {Object[]} announcements array of announcements
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next) => {
  const { number } = req.query
  const limit = number ? parseInt(number) : 5
  const totalNumber = parseInt(await Announcement.count().catch(dbCatch))
  const announcements =
    totalNumber > limit
      ? await Announcement.find()
          .skip(totalNumber - limit)
          .catch(dbCatch)
      : await Announcement.find().catch(dbCatch)
  return res.status(201).send({ data: announcements.reverse().map((ann) => ann.getPublic()) })
})
