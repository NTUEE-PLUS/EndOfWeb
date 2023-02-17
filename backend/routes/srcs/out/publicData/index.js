const express = require('express')
const router = express.Router()

router.get('/history', require('./getHist'))
router.get('/history/img', require('./getHistImg'))
router.get('/teamData', require('./getTeam'))

module.exports = router
