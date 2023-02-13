const { dbCatch, ErrorHandler } = require('../../../error')
const Announcement = require('../../../Schemas/announcement')
const asyncHandler = require('express-async-handler')

const deletAnn = async (req, res, next) => {
  const { _id } = req.body
  await Announcement.deleteOne({ _id }).catch(dbCatch)
  res.status(203).send({ _id })
}

/**
 * @api {delete} /announcement/delete delete announcement
 * @apiName deleteAnnouncement
 * @apiGroup In/announcement
 * @apiDescription 管理員刪除公告
 *
 * @apiParam {String} id 文章的編號
 *    (建議yymm)
 *
 * @apiSuccess (201) {String} _id post的_id
 *
 * @apiError (400) {String} description id is required
 */

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'required', field: '_id' }]
module.exports = [valid(rules), asyncHandler(deletAnn)]
