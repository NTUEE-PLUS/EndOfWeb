const { dbCatch } = require('../../../error')
const TeamData = require('../../../Schemas/team_data')
const asyncHandler = require('express-async-handler')

/**
 * @api {get} /teamData 獲取負責人清單
 * @apiName GetTeamData
 * @apiGroup In/auth
 * @apiDescription 獲取負責人清單
 *
 * @apiparam {x} x x
 *
 * @apiSuccess (200) {Object[]} - 負責人資料們
 * @apiSuccess (200) {String} -._id mongodb _id(for update, delete)
 * @apiSuccess (200) {String} -.name 姓名
 * @apiSuccess (200) {String} -.job 職稱
 * @apiSuccess (200) {Object[]} -.img 檔案(頭像)
 *
 * @apiError (500) {String} description 資料庫錯誤
 */

const getTeam = async (req, res) => {
  const teams = await TeamData.find().catch(dbCatch)
  res.set({ 'Cache-Control': 'private, max-age=604800' })
  return res.status(200).send(teams.map((obj) => obj.getPublic()))
}
const valid = require('../../../middleware/validation')
const rules = []

module.exports = [valid(rules), asyncHandler(getTeam)]
