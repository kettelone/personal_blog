const { Router } = require('express')
const router = Router()
const authRouter = require('../controllers/authController')

router.post('/signup', authRouter.signup_post)
router.get('/signup', authRouter.signup_get)
router.get('/login', authRouter.login_get)
router.post('/login', authRouter.login_post)
router.get('/logout', authRouter.logout_get)

module.exports = router
