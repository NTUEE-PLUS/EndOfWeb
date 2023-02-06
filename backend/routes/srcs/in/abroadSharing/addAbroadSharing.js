const { dbCatch } = require('../../../error')
const AbroadSharing = require('../../../Schemas/abroad_sharing')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /addAbroadSharing add abroadsharing
 * @apiName AddAbroadSharing
 * @apiGroup In/abroadSharing
 * @apiDescription 新增留學分享
 *
 * @apiParam {String} intro 介紹
 * @apiParam {String} YTlink Youtube連結
 * @apiParam {String} otherLinks 其他外部連結
 *
 * @apiSuccess (201) {String} _id _id
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const addAbroadSharing = async (req, res) => {
  const { intro, YTlink, otherLinks } = req.body
  const { _id } = await new AbroadSharing({ intro, YTlink, otherLinks }).save().catch(dbCatch)
  res.status(201).send({ _id })
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'optional', field: ['intro', 'YTlink', 'otherLinks'], type: 'String' }]
module.exports = [valid(rules), asyncHandler(addAbroadSharing)]
