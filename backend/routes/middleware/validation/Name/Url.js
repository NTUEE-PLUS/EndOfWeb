//check the string to be URL
function judgeURL(str) {
  const pattern = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/
  return typeof str === 'string' && str.match(pattern)
}

module.exports = ({ field = [], type = 'URL' }) => {
  return (req, res, next) => {
    try {
      field.map((q) => {
        // judge if it's an array, need to check every element in the array
        if (Array.isArray(req.body[q])) {
          if (req.body[q]?.length) {
            req.body[q].map((f) => {
              if (!judgeURL(f)) {
                throw new Error(`${f} in ${q} should be URL`)
              }
            })
          }
        } else {
          //* "Url" only judges whether a string is URL or not. The existence will be check by "required"
          if (req.body[q] && !judgeURL(req.body[q])) {
            throw new Error(`${q} must be URL, but receive ${req.body[q]}`)
          }
        }
        return true
      })
      next() // If there are no errors, call the next middleware function
    } catch (err) {
      res.json({ error: err.message })
    }
  }
}
