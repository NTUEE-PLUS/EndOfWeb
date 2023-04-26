const parseFile = require('../../../middleware/fileProcess')
const express = require('express')
const router = express.Router()
const router_auth = express.Router()

router.get('/history', require('./getHist'))
router.get('/history/img', require('./getHistImg'))
router.get('/teamData', require('./getTeam'))

router_auth.post(
  '/history',
  parseFile([{ name: 'peopleImages', maxCount: 8 }]),
  require('./auth/history/addHist'),
)
router_auth.patch(
  '/history',
  parseFile([{ name: 'peopleImages', maxCount: 8 }]),
  require('./auth/history/updateHist'),
)
router_auth.delete('/history', require('./auth/history/delHist'))

router_auth.post('/teamData', parseFile('img'), require('./auth/teamData/addTeam'))
router_auth.patch('/teamData', parseFile('img'), require('./auth/teamData/updateTeam'))
router_auth.delete('/teamData', require('./auth/teamData/delTeam'))

module.exports = { router, router_auth }
