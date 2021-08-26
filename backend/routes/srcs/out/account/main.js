const express = require('express')
const router = express.Router()
const getImg = require('../../../middleware/fileProcess')

router.post('/login', require('./login'))

router.post('/loginFB', require('./loginFB'))

router.post('/register', getImg('file'), require('./register'))

router.post('/registerFB', getImg('file'), require('./registerFB'))

router.post('/logout', require('./logout'))

router.post('/isLogin', require('./isLogin'))

module.exports = router
