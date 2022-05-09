const { Router } = require('express')
const Multer = require('multer')
const router = Router()
const audioController = require('../controllers/audioPlayerController')

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

router.get('/audio-player', audioController.playAudio)

router.post(
  '/upload-audio',
  multer.single('audio'),
  audioController.uploadAudio
)

router.post('/get-audio', audioController.getAudio)

module.exports = router
