const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')
const Column_Outline = require('../../../Schemas/column_outline')
const { findWithLimit } = require('../../../Schemas/query')

/**
 * @api {get} /column/outline get column outline with id optional
 * @apiName GetOutline
 * @apiGroup In/column
 * @apiDescription 拿Outline資料(含圖片)
 *
 * @apiparam {String} id id(optional,若未給則送全部)
 * @apiparam {String} perpage 一頁數量(optional,default 5)
 * @apiparam {String} page 頁數(optional,default 1)
 * @apiparam {String} selection mongoDB select參數(optional,default '')
 * 
 *
 * @apiSuccessExample {json} Success-Response:
 * {'data':
 * 	[{
*     'anno': ['String'],
      'date': 'String',
      'title': ['String'],
      'exp': ['String'],
      'edu': ['String'],
      'intro': ['String'],
      'id': 'String',
      'imgSrc':'String'
    },],
 * 'maxPage':'Number'}
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const getOut = async (req, res, next) => {
  const { id, page, perpage, selection } = req.query
  const query = id ? { id } : {}
  const [columnOutlines, maxPage] = await findWithLimit(
    Column_Outline,
    query,
    page,
    perpage,
    selection || '',
  )
  // * assume that images won't change frequently(max-age=2 days)
  if (selection === 'columnImg') res.set({ 'Cache-Control': 'private, max-age=172,800' })
  return res
    .status(201)
    .send({ data: columnOutlines.reverse().map((col) => col.getPublic()), maxPage })
}

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['id'],
    type: 'string',
    method: 'get',
  },
  {
    filename: 'optional',
    field: ['perpage', 'page'],
    type: 'any',
    method: 'get',
  },
]
module.exports = [valid(rules), asyncHandler(getOut)]
