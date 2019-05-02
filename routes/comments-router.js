const commentsRouter = require("express").Router();
const { patchCommentVote } = require('../controller/comment-controller')

commentsRouter
    .route('/:comment_id')
    .patch(patchCommentVote)



module.exports = commentsRouter