const { Router } = require('express')
const multer = require('multer')
const upload = multer()
const router = Router()
const imageController = require('../controllers/imageController')

router.get('/gallery', imageController.imageDownload)

router.post('/upload-image', upload.single('img'), imageController.imageUpload)

router.post('/delete-image/*', imageController.deleteImage)

module.exports = router
