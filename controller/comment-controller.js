const { addVoteToComment } = require('../models/comment-model')

const patchCommentVote = (req, res, next) => {
    addVoteToComment(req.params, req.body)
        .then(comment => {
            res.status(200).send({ comment })
        })
}


module.exports = { patchCommentVote }