const mongoose = require('mongoose')
const Schema = mongoose.Schema

const audioUrlSchema = new Schema(
  {
    audioUrl: {
      type: String,
      required: true,
    },
    audioName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const audioUrl = mongoose.model('audioUrls', audioUrlSchema)
module.exports = audioUrl
