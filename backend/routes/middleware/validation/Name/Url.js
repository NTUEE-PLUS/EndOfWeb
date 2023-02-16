const { body } = require('express-validator')

module.exports = () => [
  body('YTlink').isURL().withMessage(`YTlink must be URL(if exist)`).optional({
    nullable: true,
    checkFalsy: false,
  }),
  // check and valid every element in the otherLinks is URL
  body('otherLinks').custom((val, { req }) => {
    function judgeURL(str) {
      const pattern = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/
      return pattern.test(str)
    }
    if (req.body.otherLinks) {
      req.body.otherLinks.map((f) => {
        if (!judgeURL(f)) {
          throw new Error(`${f} in otherLinks should be URL`)
        }
      })
    }
    return true
  }),
]
