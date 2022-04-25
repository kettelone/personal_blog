const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commantSchema = new Schema(
  {
    blog_id: {
      type: String,
      required: true,
    },
    blog_comment: {
      type: String,
      required: true,
    },
    user_nickname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Comment = mongoose.model('Comments', commantSchema)
module.exports = Comment
