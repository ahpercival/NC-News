const connection = require("../db/connection");

exports.fetchArticleData = ({ author, topic, sort_by = 'articles.created_at', order_by = 'desc' }) => {
    return connection
        .select('articles.*')
        .from('articles')
        .count({ comment_count: 'comments.article_id' })
        .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
        .groupBy('articles.article_id')
        .modify(query => {
            if (author) query.where('articles.author', author)
            if (topic) query.where('articles.topic', topic)
        })
        .orderBy(sort_by, order_by);
};


exports.fetchArticleByID = (article_id) => {
    return connection('articles')
        .where('articles.article_id', '=', article_id)
        .select('articles.*')
        .count({ comment_count: 'comments.article_id' })
        .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
        .groupBy('articles.article_id')

};

exports.updateArticleVote = (articleToUpdate, voteIncrementBy) => {
    return connection('articles')
        .where('article_id', '=', articleToUpdate.article_id)
        .increment('votes', voteIncrementBy.inc_votes)
        .returning('*')
        .then(([result]) => result)
    //IS NOT RETURNING COMMENT COUNT

}