const connection = require('../db/connection')


exports.addVoteToComment = (commentToUpdate, newVote) => {
    return connection('comments')
        .where('comment_id', '=', commentToUpdate.comment_id)
        .increment('votes', newVote.inc_votes)
        .returning('*')
        .then(([result]) => result)

}


exports.removeComment = (commentToDelete) => {
    return connection("comments")
        .where("comment_id", "=", commentToDelete.comment_id)
        .del();
}