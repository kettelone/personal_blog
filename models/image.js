const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema(
  {
    image: {
      type: Buffer, // casted to MongoDB's BSON type: binData
      required: true,
    },
    image_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Image = mongoose.model('Images', imageSchema)
module.exports = Image
