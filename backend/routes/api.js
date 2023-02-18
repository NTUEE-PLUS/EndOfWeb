//routes/api.js 控管後端所有頁面部屬
const express = require('express')
const router = express.Router()
const env = require('dotenv')
env.config()

if (process.env.NODE_ENV === 'development') {
  //test
  console.log('running in dev mode')
}

//out
//login, loginFB, register, registerFB
router.use(require('./srcs/out/account'))
//forget, activation
router.use(require('./srcs/out/forget'))
//history, teamData
router.use(require('./srcs/out/publicData'))

//in
//check is user
router.use(require('./srcs/in/auth/isUser'))
//showVisual, chVisual, searchVisual
// router.use(require('./srcs/in/profile'))
//dashboard
router.use(require('./srcs/in/dashboard'))
//time
router.use('/time', require('./srcs/in/time').router)
//profile, searchProfile
router.use(require('./srcs/in/profile_new'))
//showPerson, chLogin, isLogin, logout
router.use(require('./srcs/in/account').router)
//column
router.use('/column', require('./srcs/in/column').router)
//searchJob, addJob, addRecruitment
router.use(require('./srcs/in/career'))
router.use(require('./srcs/in/recommendation'))
//study
router.use('/study', require('./srcs/in/study').router)
//abroadInfo
router.use(require('./srcs/in/abroadInfo').router)
//announce
router.use(require('./srcs/in/announcement').router)
//abroadSharing
router.use(require('./srcs/in/abroadSharing').router)

//check is auth
router.use(require('./srcs/in/auth/isAuth'))
//column
router.use('/column', require('./srcs/in/column').router_auth)
//auth
// router.use(require('./srcs/in/auth'))
//account
router.use(require('./srcs/in/account').router_auth)
//study auth
router.use('/study', require('./srcs/in/study').router_auth)
//abroadInfo
router.use(require('./srcs/in/abroadInfo').router_auth)
// announcement auth
router.use(require('./srcs/in/announcement').router_auth)
//abroadSharing
router.use(require('./srcs/in/abroadSharing').router_auth)

//error handling, every error thrown by previous router will be catch by me
router.use(require('./error').handleError)

module.exports = router
