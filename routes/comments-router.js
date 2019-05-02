const commentsRouter = require("express").Router();
const { patchCommentVote, deleteComment } = require('../controller/comment-controller')

commentsRouter
    .route('/:comment_id')
    .patch(patchCommentVote)
    .delete(deleteComment)


module.exports = commentsRouter