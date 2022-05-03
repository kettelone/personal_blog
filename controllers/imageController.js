const Image = require('../models/image')
const { v4: uuidv4 } = require('uuid')

const imageUpload = async (req, res) => {
  try {
    const image = req.file.buffer
    const file = new Image({ image, image_id: uuidv4() })
    await file.save()
    res.redirect('/gallery')
  } catch (e) {
    console.log(e)
  }
}

const imageDownload = async (req, res) => {
  try {
    const images = await Image.find()
    res.render('gallery', { images })
  } catch (e) {
    console.log(e)
  }
}

const deleteImage = async (req, res) => {
  try {
    const imageId = req.params[0]
    await Image.findOneAndDelete({ image_id: imageId })
    res.json({ redirect: `/gallery` })
  } catch (e) {
    console.log(e)
  }
}

module.exports = { imageUpload, imageDownload, deleteImage }
