const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true, //doesn`t really work
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please eneter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  nickname: {
    type: String,
    required: [true, 'Please enter your nickname'],
    unique: true,
  },
})

//fire a function after doc saved
userSchema.post('save', function (doc, next) {
  console.log('new user was created & saved', doc)
  next()
})

//fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model('user', userSchema)
module.exports = User
