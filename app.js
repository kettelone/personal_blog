require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const blogRoutes = require('./routes/blogRoutes')
const contactRoute = require('./routes/contactUsRoutes')
const authRoutes = require('./routes/authRouters')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')
// const { render } = require('ejs')

//express app
const app = express()

//connect to mongodb
const dbURI =
  'mongodb+srv://blogUser:guest12345@cluster0.3b5zr.mongodb.net/note?retryWrites=true&w=majority'
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || 80))
  .catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs')

//middleware and static files
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//routes
// '*' means apply to every get request
app.get('*', checkUser)

app.get('/', requireAuth, checkUser, (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', requireAuth, checkUser, (req, res) => {
  res.render('about', { title: 'About' })
})
app.use('/blogs', requireAuth, checkUser, blogRoutes)
app.use(authRoutes)
app.use(requireAuth, checkUser, contactRoute)

//404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
