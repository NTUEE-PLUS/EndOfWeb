const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')
const Column_Outline = require('../../../Schemas/column_outline')

/**
 * @api {post} /getOutline 拿Outline資料
 * @apiName GetOutline
 * @apiGroup In/column
 *
 * @apiparam {-} - -
 *
 * @apiSuccessExample {json} Success-Response:
 * 	HTTP/1.1 200 OK
 * 	[{
 * 		id:["yymm"],
 * 		anno:["作者1","作者2","作者3"],
 * 		date:"yyyy/mm/dd 星期x",
 * 		title:["yyyy級 採訪者姓名 (目前職位)"...],
 * 		exp:["採訪者姓名 現任:目前職位"...],
 * 		edu:["採訪者姓名 學士/碩士/博士:....(畢業年分)",...],
 * 		intro:["內文段落1","內文段落2"...],
 * 	}]
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res, next) => {
  const columnOulines = await Column_Outline.find().catch(dbCatch)
  return res.status(201).send(columnOulines.map((col) => col.getPublic()))
})
