//check the string to be URL
function judgeURL(str) {
  const pattern = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/
  return str.match(pattern)
}

module.exports = ({ field = [], type = 'URL' }) => {
  return (req, res, next) => {
    try {
      field.map((q) => {
        // judge if it's an array, need to check every element in the array
        if (Array.isArray(req.body[q])) {
          if (req.body[q]) {
            req.body[q].map((f) => {
              if (!judgeURL(f)) {
                throw new Error(`${f} in ${q} should be URL`)
              }
            })
          }
          return true
        } else {
          if (!judgeURL(req.body[q])) {
            throw new Error(`${q} must be URL`)
          }
        }
      })
      next() // If there are no errors, call the next middleware function
    } catch (err) {
      res.json({ error: err.message })
    }
  }
}
