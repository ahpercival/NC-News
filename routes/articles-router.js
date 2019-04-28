const articlesRouter = require("express").Router();
const { getArticleData, getArticleByID, patchArticleVote, getArticleComments } = require('../controller/article-controller')

articlesRouter
    .route('/')
    .get(getArticleData);

articlesRouter
    .route('/:article_id')
    .get(getArticleByID)
    .patch(patchArticleVote);

articlesRouter
    .route('/:article_id/comments')
    .get(getArticleComments)

module.exports = articlesRouter