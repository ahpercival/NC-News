const commentsRouter = require("express").Router();
const { patchCommentVote } = require('../controller/comment-controller')

commentsRouter
    .route('/')
    .patch(patchCommentVote)

module.exports = commentsRouter