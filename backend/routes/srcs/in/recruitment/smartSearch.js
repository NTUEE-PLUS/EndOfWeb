const Recruitment = require('../../../Schemas/recruitment')
const asyncHandler = require('express-async-handler')
const { findWithLimit } = require('../../../Schemas/query')

/**
 * @api {post} /smartsearchRecruitment search recruitment by keywords
 * @apiName ShowRecruitment
 * @apiGroup In/career
 * @apiDescription 用空格區分關鍵字進行搜尋
 *
 * @apiParam {String} keyword 用空格區分
 *
 * @apiSuccess (201) {Object[]} - 職缺們
 * @apiSuccess (201) {String} -._id mongodb _id(for delete)
 * @apiSuccess (201) {Object} -.title 標題相關
 * @apiSuccess (201) {String} -.title.title 標題
 * @apiSuccess (201) {String} -.title.company_name 公司名稱
 * @apiSuccess (201) {String} -.title.work_type 職位(ex.前端工程師)
 * @apiSuccess (201) {Object} -.info 工作資訊
 * @apiSuccess (201) {String} -.info.salary 薪資
 * @apiSuccess (201) {String[]} -.info.experience 經驗要求
 * @apiSuccess (201) {String} -.info.diploma 學院要求
 * @apiSuccess (201) {Object} -.spec 詳細描述
 * @apiSuccess (201) {String[]} -.spec.requirement 技能要求
 * @apiSuccess (201) {String[]} -.spec.description 工作的其他描述
 * @apiSuccess (201) {String} -.image 公司頭像(Ex. <code>\<img src={image}/></code>)
 *
 * @apiError (500) {String} description 資料庫錯誤
 */
const smartSrh = async (req, res, next) => {
  const { keyword, page, perpage } = req.body
  const query = Recruitment.smartQuery(keyword)
  const [recrus, maxPage] = await findWithLimit(Recruitment, query, page, perpage)
  res.status(201).send({ data: recrus.map((recru) => recru.getPublic()).reverse() })
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'optional', field: ['keyword'] }]
module.exports = [valid(rules), asyncHandler(smartSrh)]
