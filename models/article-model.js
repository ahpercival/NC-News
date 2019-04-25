const connection = require("../db/connection");

exports.fetchArticleData = ({ author, topic, sort_by, order_by }) => {

    if (!sort_by) { sort_by = 'articles.created_at' }
    if (!order_by) { order_by = 'desc' }

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
