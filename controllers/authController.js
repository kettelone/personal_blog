const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { email: '', password: '' }

  //incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'email is not registered'
  }

  //incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'password is incorrect'
  }

  if (err.code === 11000) {
    // duplicate email error
    errors.email = 'email is already registered'
    return errors
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

// create json web token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  })
}

const signup_get = (req, res) => {
  res.render('../views/auth/signup.ejs')
}

const signup_post = async (req, res) => {
  const { email, password, nickname } = req.body
  try {
    const emailExist = await User.findOne({ email })
    if (!emailExist) {
      const user = new User({ email, password, nickname })
      await user.save()
      const token = createToken(user._id)
      //httpOnly means cookie can not be accessed from the frontend
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
      res.status(201).json({ user: user._id })
    } else {
      res.json({ errors: { email: 'email already exist' } })
    }
  } catch (e) {
    const errors = handleErrors(e)
    res.status(400).json({ errors })
  }
}

const login_get = (req, res) => {
  res.render('../views/auth/login.ejs')
}

const login_post = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      const auth = await bcrypt.compare(password, user.password)

      if (auth) {
        const token = createToken(user._id)
        //httpOnly means cookie can not be accessed from the frontend
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
        return
      }
      throw Error('incorrect password')
    } else {
      throw Error('incorrect email')
    }
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

const logout_get = async (req, res) => {
  console.log('log out pressed')
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}

module.exports = { signup_post, signup_get, login_post, login_get, logout_get }
