const { dbCatch } = require('../../../error')
const AbroadSharing = require('../../../Schemas/abroad_sharing')
const asyncHandler = require('express-async-handler')
const { parseImg } = require('../../../Schemas/query')

/**
 * @api {post} /addAbroadSharing add abroadsharing
 * @apiName AddAbroadSharing
 * @apiGroup In/abroadSharing
 * @apiDescription 新增留學分享
 *
 * @apiParam {String} title 採訪標題
 * @apiParam {String} intro 介紹
 * @apiParam {URL} YTlink Youtube連結
 * @apiParam {URL} otherLinks 其他外部連結
 * @apiParam {File} file 留學分享照片
 *
 * @apiSuccess (201) {String} _id _id
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const addAbroadSharing = async (req, res) => {
  const { title, intro, YTlink, otherLinks } = req.body
  const img = parseImg(req.file)
  const { _id } = await new AbroadSharing({ title, intro, YTlink, otherLinks, img })
    .save()
    .catch(dbCatch)
  res.status(201).send({ _id })
}

const valid = require('../../../middleware/validation')
const rules = [
  { filename: 'optional', field: ['title', 'intro'], type: 'String' },
  { filename: 'Url', field: ['YTlink', 'otherLinks'], type: 'URL' },
]

module.exports = [valid(rules), asyncHandler(addAbroadSharing)]
