const { dbCatch, ErrorHandler } = require('../../../error')
const Recommendation = require('../../../Schemas/recommendation')
const { parseFile } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

/** 
 * @api {post} /recommendation add recommendation
 * @apiName AddRecommendation
 * @apiGroup In/recommendation
 * @apiDescription 新增簡歷
 * 
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 * 
 * @apiparam {String} title 簡歷標題
 * @apiparam {String} name 姓名
 * @apiparam {String} desire_work_type 想要職位
 * @apiparam {String} contact 電話
 * @apiparam {String} email 信箱
 * @apiparam {String} diploma 學位
 * @apiparam {String[]} experience 經驗
 * @apiparam {String[]} speciality 專長
 * @apiparam {File} file 照片
 * 
 * @apiSuccess (201) title 簡歷標題
 * @apiSuccess (201) _id mongoDB的_id
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */
const addRec = async (req, res) => {
  const account = req.session.loginAccount
  const check = await Recommendation.findOne({ account })
  if (check) res.status(403).send({ description: 'already have recommendation' })
  const { title, type, name, desire_work_type, contact, email, diploma, experience, speciality } =
    req.body

  const resume = req.files.filter((file) => file.originalname === '.pdf')[0]
  const img = req.files.filter((file) => file.originalname === '.png')[0]
  const recomd = await new Recommendation({
    account,
    title: { title, type, name, desire_work_type },
    info: { contact, email, diploma },
    spec: { experience, speciality },
    img: parseFile(img),
    resume: parseFile(resume),
  })
    .save()
    .catch(dbCatch)

  return res.status(200).send({ title: recomd.title.title, _id: recomd._id })
}

const valid = require('../../../middleware/validation')
const rules = [
  {
    filename: 'optional',
    field: ['title', 'type', 'name', 'desire_work_type', 'contact', 'diploma', 'resume'],
    type: 'string',
  },
  {
    filename: 'optional',
    field: ['email'],
    type: 'email',
  },
  {
    filename: 'optional',
    field: ['experience', 'speciality'],
    type: 'array',
  },
]
module.exports = [valid(rules), asyncHandler(addRec)]
