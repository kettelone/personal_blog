const fs = require('fs')
const path = require('path')
const { Storage } = require('@google-cloud/storage')
const audioUrl = require('../models/audioUrl')

// Creates a client using Application Default Credentials
const googleStorage = new Storage({
  keyFilename: path.join(__dirname, `../${process.env.GOOGLE_CLOUD_KEY_FILE}`),
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
})

const audioBucket = googleStorage.bucket(process.env.GOOGLE_CLOUD_BUCKET)
const uploadAudio = async (req, res) => {
  try {
    if (req.file) {
      /*blog - a collection of data in binary form, 
      typically a multimedia item, stored as a single entity 
      in a database management system*/
      const blob = audioBucket.file(req.file.originalname)
      const blobStream = blob.createWriteStream()
      blobStream.on('finish', () => {
        res.status(200).redirect('/audio-player')
      })
      blobStream.end(req.file.buffer)

      const url = new audioUrl({
        audioUrl: `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET}/${req.file.originalname}`,
        audioName: req.file.originalname,
      })
      await url.save()
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

const playAudio = async (req, res) => {
  const data = await audioUrl.find()
  let audioInfo = []
  data.forEach((item) => {
    audioInfo.push([item.audioUrl, item.audioName])
  })
  res.render('audio-player.ejs', { audioInfo })
}

const getAudio = async (req, res) => {
  try {
    const fileName = req.body.audioUrl
    console.log(fileName)
    const destFileName = `C:\\Users\\guest_3rh8a7w\\VS CODE\\Lambda-internship\\Side project\\Blog\\public\\audio\\${fileName}`

    if (!fs.existsSync(destFileName)) {
      async function streamFileDownload() {
        // The example below demonstrates how we can reference a remote file, then
        // pipe its contents to a local file.
        // Once the stream is created, the data can be piped anywhere (process, sdout, etc)
        await googleStorage
          .bucket(process.env.GOOGLE_CLOUD_BUCKET)
          .file(fileName)
          .createReadStream() //stream is created
          .pipe(fs.createWriteStream(destFileName))
          .on('finish', () => {
            // The file download is complete
          })

        console.log(
          `gs://${process.env.GOOGLE_CLOUD_BUCKET}/${fileName} downloaded to ${destFileName}.`
        )
      }

      streamFileDownload()
        .catch(console.error)
        .then(res.json({ redirect: `/audio-player` }))
      // res.json({ redirect: `/audio-player` })
    }

    // download object from Google Cloud Storage bucket
    // await googleStorage
    //   .bucket(process.env.GOOGLE_CLOUD_BUCKET)
    //   .file(fileName)
    //   .download({ destination: `C:\\ALL PERSONAL FILES\\${fileName}` })
  } catch (e) {
    console.log(e)
  }
}

module.exports = { uploadAudio, playAudio, getAudio }
