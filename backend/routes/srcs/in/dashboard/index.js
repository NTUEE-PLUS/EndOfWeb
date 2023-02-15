const express = require('express')
const router = express.Router()

router.get('/recommendation/recent', require('./recentRecommendation'))
router.get('/recruitment/recent', require('./recentRecruitment'))
router.get('/column/recent', require('./recentColumn'))
router.get('/announcement/recent', require('./recentAnnouncement'))

module.exports = router
