const express = require('express')
const router = express.Router()
const router_auth = express.Router()
const parseFile = require('../../../middleware/fileProcess')

router.post('/showPersonal', require('./showPersonal'))
router.post('/chPassword', require('./chPassword'))

router_auth.post('/manageAuth', require('./auth/manageAuth'))
router_auth.post('/handlePending', require('./auth/handlePending'))
router_auth.post('/showPending', require('./auth/showPending'))
router_auth.post('/delUser', require('./auth/deleteUser'))

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
