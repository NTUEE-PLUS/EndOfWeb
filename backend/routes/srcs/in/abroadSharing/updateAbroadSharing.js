const abroad_sharing = require('../../../Schemas/abroad_sharing')
const { updateQuery, parseImg } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')

/**
 * @api {patch} /updateAbroadSharing update abroadSharing
 * @apiName updateAbroadSharing
 * @apiGroup In/abroadSharing
 * @apiDescription 給_id更新留學分享資訊
 *
 * @apiParam {String} _id _id
 * @apiParam {String} title 標題
 * @apiParam {String} intro 介紹
 * @apiParam {URL} YTlink youtube連結
 * @apiParam {URL} otherLinks 其他連結
 * @apiParam {File} file 留學分享照片
 *
 *
 * @apiSuccess (200) _id _id
 *
 * @apiError (403) {String} description please provide _id
 * @apiError (404) {String} description 資料不存在
 * @apiError (500) {String} description 資料庫錯誤
 */
const updateAbroadSharing = async (req, res, next) => {
  const { _id, title, intro, YTlink, otherLinks } = req.body
  if (!_id) throw new ErrorHandler(403, 'please provide _id')
  const obj = await abroad_sharing.findOne({ _id }).catch(dbCatch)
  if (!obj) throw new ErrorHandler(404, '資料不存在')

  const img = parseImg(req.file)
  const toSet = updateQuery({ title, intro, YTlink, otherLinks, img })
  await abroad_sharing.findByIdAndUpdate(_id, toSet).catch(dbCatch)
  return res.status(200).end()
}

const valid = require('../../../middleware/validation')
const rules = [
  { filename: 'required', field: '_id' },
  { filename: 'optional', field: ['intro', 'title'], type: 'String' },
  { filename: 'Url', field: ['YTlink', 'otherLinks'], type: 'URL' },
]

module.exports = [valid(rules), asyncHandler(updateAbroadSharing)]
