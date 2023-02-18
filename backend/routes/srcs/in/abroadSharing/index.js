const express = require('express')
const router_auth = express.Router()
const router = express.Router()

router.get('/getallAbroadSharing', require('./getallAbroadSharing'))

router.get('/getoneAbroadSharing', require('./getoneAbroadSharing'))

router_auth.post('/addAbroadSharing', require('./addAbroadSharing'))

router_auth.delete('/deleteAbroadSharing', require('./deleteAbroadSharing'))

router_auth.patch('/updateAbroadSharing', require('./updateAbroadSharing'))

module.exports = { router, router_auth }
