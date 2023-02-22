const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')
const Column_Outline = require('../../../Schemas/column_outline')

/**
 * @api {get} /column/recent get recent column
 * @apiName RecentColumn
 * @apiGroup In/recent
 * @apiDescription 拿Outline資料(含圖片)
 *
 * @apiParam {Number} number=5 篇數
 *
 * @apiSuccessExample {json} Success-Response:
 * {'data':
 * 	[{
 *    'anno': ['String'],
 *    'date': 'String',
 *    'title': ['String'],
 *    'exp': ['String'],
 *    'edu': ['String'],
 *    'intro': ['String'],
 *    'id': 'String',
 *    'columnImg': {
 *      'data': 'Buffer',
 *      'contentType': 'String',
 *    }
 *  }]
 * }
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next) => {
  const { number } = req.query
  const limit = number ? parseInt(number) : 5
  const totalNumber = parseInt(await Column_Outline.count().catch(dbCatch))
  const columnOulines =
    totalNumber > limit
      ? await Column_Oulines.find()
          .skip(totalNumber - limit)
          .catch(dbCatch)
      : await Column_Oulines.find().catch(dbCatch)
  return res.status(201).send({ data: columnOulines.reverse().map((col) => col.getPublic()) })
})
