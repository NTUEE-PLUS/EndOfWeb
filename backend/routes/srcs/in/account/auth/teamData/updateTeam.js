const { dbCatch, ErrorHandler } = require('../../../../../error')
const TeamData = require('../../../../../Schemas/team_data')
const { parseImg } = require('../../../../..//Schemas/query')
const asyncHandler = require('express-async-handler')

/**
 * @api {patch} /teamData 更新負責人清單成員
 * @apiName UpdateTeamData
 * @apiGroup In/auth
 * @apiDescription 更新負責人清單成員
 *
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 *
 * @apiparam {String} _id get或add時回傳的_id
 * @apiparam {String} name 姓名
 * @apiparam {String} job 職稱
 * @apiparam {String} index 順序(非負整數字串)
 * @apiparam {File} img 檔案(頭像)
 *
 * @apiSuccess (201) - -
 *
 * @apiError (404) {String} description not valid _id
 * @apiError (500) {String} description 資料庫/資料格式錯誤
 */

const updateTeam = async (req, res) => {
  const { name, job, _id } = req.body
  const data = await TeamData.findById(_id, 'name').catch(dbCatch)
  if (!data) throw new ErrorHandler(404, '_id not found')

  const index = +req.body.index
  if (!Number.isFinite(index) || index < 0 || !Math.floor(index) === index)
    throw new ErrorHandler(500, "index's form is wrong")

  const img = parseImg(req.file)
  if (!img) throw new ErrorHandler(500, 'image not found')
  const teamData = await TeamData.findByIdAndUpdate(_id, { name, job, img, index }).catch((e) => {
    throw new ErrorHandler(500, '資料格式錯誤')
  })

  return res.status(201).end()
}
const valid = require('../../../../../middleware/validation')
const rules = [{ filename: 'required', field: ['name', 'job', '_id', 'index'], type: 'string' }]

module.exports = [valid(rules), asyncHandler(updateTeam)]
