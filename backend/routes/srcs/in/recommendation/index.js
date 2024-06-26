const express = require('express')
const router = express.Router()
const parseFile = require('../../../middleware/fileProcess')

router.post('/recommendation', parseFile('files[]'), require('./addRec'))
router.patch('/recommendation', parseFile('files[]'), require('./updateRec'))

router.get('/recommendation/mine', require('./showMyRec'))
router.get('/recommendation', require('./showRec'))
router.post('/smartsearchrecommendation', require('./smartSearch'))
router.delete('/recommendation', require('./delRec'))

module.exports = router
