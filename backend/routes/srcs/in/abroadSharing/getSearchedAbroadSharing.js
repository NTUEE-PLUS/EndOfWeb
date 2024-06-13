const abroad_sharing = require('../../../Schemas/abroad_sharing')
const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')
/**
 * @api {get} /getSearchedAbroadSharing search abroadsharing & get them
 * @apiName getSearchedAbroadSharing
 * @apiGroup In/abroadSharing
 * @apiDescription 搜尋留學分享資訊
 *
 * @apiparam {String[]} keywords keywords 的 array
 * @apiparam {String} pageNum 頁數
 * @apiparam {String} numPerPage 每頁的個數
 *
 * @apiSuccess (201) {String} maxPage 最大頁數
 * @apiSuccess (201) {Object[]} data  資料
 * @apiSuccess (201) {String} -.title  標題
 * @apiSuccess (201) {String} -.category  分類
 * @apiSuccess (201) {String} -.intro  介紹
 * @apiSuccess (201) {URL} -.YTlink youtube連結
 * @apiSuccess (201) {Object[]} -.otherLinks 其他連結
 * @apiSuccess (201) {URL} -.-.link 連結
 * @apiSuccess (201) {String} -.-.desc 連結內容說明
 *
 * @apiError (404) {String} description 資料不存在
 * @apiError (500) {String} description 資料庫錯誤
 */
function getValidRegexp(keyword) {
  const isRegExp = /^\/?(?<content>([^\/]||(\\\/))*)(\/[igmsuy]*)?$/
  if (typeof keyword !== 'string' || !keyword) return null
  keyword = keyword.replace(isRegExp, '$<content>')
  try {
    return new RegExp(keyword)
  } catch (e) {
    return null
  }
}

function getUnionRegex(regExs) {
  return (
    Array.isArray(regExs) && new RegExp(`(${regExs.map((regex) => regex.source).join(')|(')})`, 'i')
  )
}

function getPageData(pageNum, numPerPage, data) {
  const start = (pageNum - 1) * numPerPage
  const end = pageNum * numPerPage
  return data.filter((v, i) => i >= start && i < end)
}

const getSearchedAbroadSharing = async (req, res, next) => {
  const { keywords, pageNum, numPerPage, reversedOrder } = req.query
  const regExpKeywords =
    keywords?.length && keywords.map((keyword) => getValidRegexp(keyword)).filter((v) => !!v)
  const unionRegex = getUnionRegex(regExpKeywords)
  const query = regExpKeywords?.length
    ? { $or: [{ title: unionRegex }, { intro: unionRegex }] }
    : {}
  const sharing = await abroad_sharing
    .find(query)
    .select('-img')
    .sort({ updatedAt: +reversedOrder ? 1 : -1 })
    .catch(dbCatch)
  const maxPage = Math.ceil(sharing.length / (numPerPage || 5))
  const toSend = getPageData(pageNum || 1, numPerPage || 5, sharing)
  res.set({ 'cache-control': 'private, max-age=600' })
  res.status(201)
  if (!sharing?.length) res.send({ maxPage: 0, data: [] })
  else res.send({ maxPage, data: toSend.map((v) => v.getPublic()) })
}

module.exports = asyncHandler(getSearchedAbroadSharing)
