const abroad_sharing = require('../../../Schemas/abroad_sharing')
const { updateQuery } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')

/**
 * @api {patch} /updateAbroadSharing update abroadSharing
 * @apiName updateAbroadSharing
 * @apiGroup In/abroadSharing
 * @apiDescription 給_id更新留學分享資訊
 *
 * @apiParam {String} _id _id
 * @apiParam {String} intro 介紹
 * @apiParam {String} YTlink youtube連結
 * @apiParam {String} otherlnks 其他連結
 *
 *
 * @apiSuccess (200) _id _id
 *
 * @apiError (404) {String} description 資料不存在
 * @apiError (403) {String} description _id doesnot exist
 * @apiError (500) {String} description 資料庫錯誤
 */
const updateAbroadSharing = async (req, res, next) => {
  const { _id, intro, YTlink, otherlinks } = req.body
  if (!_id) throw new ErrorHandler(403, '_id doesnot exist')
  const obj = await abroad_sharing.findOne({ _id }).catch(dbCatch)
  if (!obj) throw new ErrorHandler(404, '資料不存在')

  const toSet = updateQuery({ intro, YTlink, otherlinks })
  await abroad_sharing.findByIdAndUpdate(_id, toSet).catch(dbCatch)
  return res.status(200).end()
}

const valid = require('../../../middleware/validation')
const rules = [
  { filename: 'required', field: '_id' },
  { filename: 'optional', field: ['intro', 'YTlink', 'otherlinks'], type: 'String' },
]

module.exports = [valid(rules), asyncHandler(updateAbroadSharing)]
