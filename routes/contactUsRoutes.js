const { Router } = require('express')
const router = Router()
const contactUsController = require('../controllers/contactUsController')

// const router = express.Router()

router.get('/contact-us', (req, res) => {
  res.render('contact-us', { message: '' })
})

router.post('/contact-us', contactUsController.contactUs)

module.exports = router
