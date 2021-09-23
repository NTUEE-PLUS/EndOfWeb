const express = require('express')
const router = express.Router()
const parseFile = require('../../../middleware/fileProcess')

router.post('/login', require('./login'))

router.post('/loginFB', require('./loginFB'))

router.post('/register', parseFile('file'), require('./register'))
router.get('/regact/:account/:active', require('./activate'))

router.post('/registerFB', parseFile('file'), require('./registerFB'))

router.post('/logout', require('./logout'))

router.post('/isLogin', require('./isLogin'))

module.exports = router
