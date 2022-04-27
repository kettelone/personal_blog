const Comment = require('../models/comment')
// const Blog = require('../models/blog')

const save_comment = async (req, res) => {
  try {
    const response = res.cookie()
    const user_nickname = response.locals.user.nickname
    const url = req.headers.referer
    let urlSplit = url.split('')
    let startIndex = 0
    for (let i = urlSplit.length, k = 0; i > 0; i--, k++) {
      if (urlSplit[i] === '/') {
        startIndex = urlSplit.length - k + 1
        break
      }
    }
    const blog_id = url.substr(startIndex)
    const blog_comment = req.body.comment
    const comment = new Comment({ blog_id, blog_comment, user_nickname })
    await comment.save()
    res.redirect(url)
  } catch (e) {
    console.log(e)
  }
}

const delete_comment = async (req, res) => {
  try {
    const blog_id = req.params.blog_id
    const comment_id = req.params.comment_id

    await Comment.findByIdAndDelete(comment_id)
    res.json({ redirect: `/blogs/${blog_id}` })
  } catch (e) {
    console.log(e)
  }
}

// const sort_comments = async (req, res) => {
//   console.log('pressed')
//   try {
//     const baseUrl = 'http://localhost:3000/blogs/'
//     const url = req.headers.referer
//     const startIndex = baseUrl.length
//     const blog_id = url.substr(startIndex)
//     console.log(blog_id)
//     const my_blog = await Blog.find({ _id: blog_id })
//     const comments = await Comment.find({ blog_id: blog_id }).sort({
//       createdAt: -1,
//     })
//     res.json({ redirect: `/blogs/${blog_id}` })
//   } catch (e) {
//     console.log(e)
//   }
// }

module.exports = {
  save_comment,
  delete_comment,
}
