const { addVoteToComment, removeComment } = require('../models/comment-model')

const patchCommentVote = (req, res, next) => {

    if (!!req.params.comment_id.match(/([A-Za-z])/)) { return next({ code: '4044' }) }

    if (typeof req.body.inc_votes !== 'number') { return next({ code: '4006' }) }

    addVoteToComment(req.params, req.body)
        .then(comment => {
            if (comment === undefined) { return next({ code: '4044' }) }
            res.status(200).send({ comment })
        })
        .catch(next);
}

const deleteComment = (req, res, next) => {

    removeComment(req.params)
        .then(() => {
            res.status(204).send();
        })
        .catch(next);
}

module.exports = { patchCommentVote, deleteComment }