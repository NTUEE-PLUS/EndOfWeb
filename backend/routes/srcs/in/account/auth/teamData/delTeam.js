const { dbCatch, ErrorHandler } = require('../../../../../error')
const TeamData = require('../../../../../Schemas/team_data')
const asyncHandler = require('express-async-handler')

/**
 * @api {delete} /teamData 刪除負責人清單成員
 * @apiName DeleteTeamData
 * @apiGroup In/auth
 * @apiDescription 刪除負責人清單成員
 *
 * @apiparam {String} _id get或add時回傳的_id
 *
 * @apiSuccess (200) name name
 *
 * @apiError (404) {String} description not valid _id
 * @apiError (500) {String} description 資料庫錯誤
 */

const delTeam = async (req, res) => {
  const { _id } = req.query
  const data = await TeamData.findById(_id, 'name').catch(dbCatch)
  if (!data) throw new ErrorHandler(404, '_id not found')
  const teamData = await TeamData.findByIdAndDelete(_id).catch(dbCatch)

  return res.status(200).send({ name: teamData.name })
}
const valid = require('../../../../../middleware/validation')
const rules = [{ filename: 'required', field: ['_id'], type: 'string', method: 'delete' }]

module.exports = [valid(rules), asyncHandler(delTeam)]
