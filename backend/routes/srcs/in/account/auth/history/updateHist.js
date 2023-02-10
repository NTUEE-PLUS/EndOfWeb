const { dbCatch, ErrorHandler } = require('../../../../../error')
const { History, HistImg } = require('../../../../../Schemas/history')
const { parseImg } = require('../../../../..//Schemas/query')
const asyncHandler = require('express-async-handler')

/**
 * @api {patch} /history 更新一年資料(部長歷史清單)
 * @apiName UpdateHistory
 * @apiGroup In/auth
 * @apiDescription 更新一年資料(部長歷史清單)
 *
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 *
 * @apiparam {String} _id get或add時回傳的_id
 * @apiparam {String} grade 年級
 * @apiparam {String} title 標題
 * @apiparam {File[]} peopleImages 檔案(頭像)
 * @apiparam {String} peopleImages.originalname ${姓名}.${file extension}(file name)
 *
 * @apiSuccess (201) - -
 *
 * @apiError (404) {String} description not valid _id
 * @apiError (500) {String} description 資料庫錯誤
 */

const updateHist = async (req, res) => {
  const { grade, title, _id } = req.body
  if (!Array.isArray(req.files.peopleImages) || req.files.peopleImages.some((file) => !file))
    throw new ErrorHandler(500, '資料格式錯誤')
  const data = await History.findById(_id, 'people').catch(dbCatch)

  if (!data) throw new ErrorHandler(404, '_id not found')
  await Promise.all(data.people.map(({ img }) => HistImg.findByIdAndDelete(img)))
  const people = await Promise.all(
    req.files.peopleImages.map(async (img) => {
      const mongoImg = await new HistImg(parseImg(img)).save()
      return {
        name: img.originalname.replace(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/, ''),
        img: mongoImg._id,
      }
    }),
  )

  await History.findByIdAndUpdate(_id, {
    grade,
    title,
    people,
  }).catch((e) => {
    throw new ErrorHandler(500, '資料格式錯誤')
  })

  return res.status(201).end()
}
const valid = require('../../../../../middleware/validation')
const rules = [{ filename: 'required', field: ['grade', 'title', '_id'], type: 'string' }]

module.exports = [valid(rules), asyncHandler(updateHist)]
