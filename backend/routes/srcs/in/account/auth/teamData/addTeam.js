const { dbCatch, ErrorHandler } = require('../../../../../error')
const TeamData = require('../../../../../Schemas/team_data')
const { parseImg } = require('../../../../..//Schemas/query')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /teamData 新增負責人清單成員
 * @apiName AddTeamData
 * @apiGroup In/auth
 * @apiDescription 新增負責人清單成員
 *
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 *
 * @apiparam {String} name 姓名
 * @apiparam {String} job 職稱
 * @apiparam {String} index 順序(非負整數字串)
 * @apiparam {File} img 檔案(頭像)
 *
 * @apiSuccess (201) _id mongoDB的_id
 *
 * @apiError (500) {String} description 資料庫/資料格式錯誤
 */

const addTeam = async (req, res) => {
  const { name, job } = req.body
  const index = +req.body.index
  if (!Number.isFinite(index) || index < 0 || !Math.floor(index) === index)
    throw new ErrorHandler(500, "index's form is wrong")

  const img = parseImg(req.file)
  if (!img) throw new ErrorHandler(500, 'image not found')
  const teamData = await new TeamData({ name, job, img, index }).save().catch(dbCatch)

  return res.status(201).send({ _id: teamData._id })
}
const valid = require('../../../../../middleware/validation')
const rules = [{ filename: 'required', field: ['name', 'job', 'index'], type: 'string' }]

module.exports = [valid(rules), asyncHandler(addTeam)]
