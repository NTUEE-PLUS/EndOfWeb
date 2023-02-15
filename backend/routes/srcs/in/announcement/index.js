const express = require('express')
const router = express.Router()
const router_auth = express.Router()

router.get('/getAnnouncement', require('./getAnnouncement'))
router.post('/searchAnnouncement', require('./searchAnnouncement'))
router.post('/smartsearchAnnouncement', require('./smartSearch'))

router_auth.post('/addAnnouncement', require('./addAnnouncement'))
router_auth.delete('/deleteAnnouncement', require('./deleteAnnouncement'))
router_auth.patch('/editAnnouncement', require('./editAnnouncement'))

module.exports = { router, router_auth }
