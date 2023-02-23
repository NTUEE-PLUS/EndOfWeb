const { dbCatch, ErrorHandler } = require('../../../../../error')
const { History, HistImg } = require('../../../../../Schemas/history')
const { parseImg } = require('../../../../..//Schemas/query')
const asyncHandler = require('express-async-handler')

/**
 * @api {post} /history add grade
 * @apiName AddHistory
 * @apiGroup In/account
 * @apiDescription 新增一年資料(部長歷史清單)
 *
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 *
 * @apiparam {String} grade 年級
 * @apiparam {String} title 標題
 * @apiparam {File[]} peopleImages 檔案(頭像)
 * @apiparam {String} peopleImages.originalname ${姓名}.${file extension}(file name)
 *
 * @apiSuccess (201) grade 年級
 * @apiSuccess (201) _id mongoDB的_id
 *
 * @apiError (500) {String} description 資料庫/資料格式錯誤
 */
const addHist = async (req, res) => {
  const { grade, title } = req.body
  if (!Array.isArray(req.files.peopleImages) || req.files.peopleImages.some((file) => !file))
    throw new ErrorHandler(500, '資料格式錯誤')

  const people = await Promise.all(
    req.files.peopleImages.map(async (img) => {
      const mongoImg = await new HistImg(parseImg(img)).save()
      return {
        name: img.originalname.replace(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/, ''),
        img: mongoImg._id,
      }
    }),
  )
  const history = await new History({
    grade,
    title,
    people,
  })
    .save()
    .catch(dbCatch)

  return res.status(201).send({ title: history.title, _id: history._id })
}
const valid = require('../../../../../middleware/validation')
const rules = [{ filename: 'required', field: ['grade', 'title'], type: 'string' }]

module.exports = [valid(rules), asyncHandler(addHist)]
