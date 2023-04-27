const express = require('express')
const router_auth = express.Router()
const router = express.Router()
const parseFile = require('../../../middleware/fileProcess')

router.get('/getallAbroadSharing', require('./getallAbroadSharing'))

router.get('/getoneAbroadSharing', require('./getoneAbroadSharing'))

router.get('/getSearchedAbroadSharing', require('./getSearchedAbroadSharing'))

router.get('/getAbroadSharingImg', require('./getAbroadSharingImg'))

router_auth.post('/addAbroadSharing', parseFile('img'), require('./addAbroadSharing'))

router_auth.delete('/deleteAbroadSharing', require('./deleteAbroadSharing'))

router_auth.patch('/updateAbroadSharing', parseFile('img'), require('./updateAbroadSharing'))

module.exports = { router, router_auth }
