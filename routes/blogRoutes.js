const express = require('express')
const blogController = require('../controllers/blogController')
const commentController = require('../controllers/commentController')
const router = express.Router()

router.get('/create', blogController.blog_create_get)
router.get('/', blogController.blog_index)
router.post('/', blogController.blog_create_post)
router.get('/:id', blogController.blog_details)
router.delete('/:id', blogController.blog_delete)
router.post('/:id/comments', commentController.save_comment)
router.delete(
  '/:blog_id/:comment_id/comments',
  commentController.delete_comment
)

module.exports = router
