const express = require('express')
const router_auth = express.Router()
const router = express.Router()

router_auth.post('/addAbroadSharing', require('./addAbroadSharing'))
router.get('/getAbroadSharing', require('./getAbroadSharing'))
router_auth.delete('/deleteAbroadSharing', require('./deleteAbroadSharing'))
router_auth.patch('/updateAbroadSharing', require('./updateAbroadSharing'))
module.exports = { router, router_auth }
