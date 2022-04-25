const Blog = require('../models/blog')
const Comment = require('../models/comment')
const { weatherInfo } = require('./weatherController')
const { currencyData } = require('./currencyRateController')

const blog_index = async (req, res) => {
  try {
    const weather = await weatherInfo()
    const currencyInfo = await currencyData()
    const result = await Blog.find().sort({ createdAt: -1 })
    res.render('blogs/index', {
      blogs: result,
      title: 'All blogs',
      weatherInfo: weather,
      currencyInfo: currencyInfo,
    })
  } catch (e) {
    console.log(e)
  }
}

const blog_details = async (req, res) => {
  try {
    const id = req.params.id
    const my_blog = await Blog.findById(id)
    const my_comment = await Comment.find({ blog_id: id })
    res.render('blogs/details', {
      blog: my_blog,
      title: 'Blog Details',
      comments: my_comment,
    })
  } catch (err) {
    res.status(404).render('404', { title: 'Blog not found' })
  }
}

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create a new blog' })
}

const blog_create_post = async (req, res) => {
  try {
    const blog = new Blog(req.body)
    await blog.save()
    res.redirect('/blogs')
  } catch (e) {
    console.log(e)
  }
}

const blog_delete = async (req, res) => {
  try {
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    await Comment.deleteMany({ blog_id: id })
    res.json({ redirect: '/blogs' })
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
}
