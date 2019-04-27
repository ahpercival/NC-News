const articlesRouter = require("express").Router();
const { getArticleData, getArticleByID, patchArticleVote } = require('../controller/article-controller')

articlesRouter
    .route('/')
    .get(getArticleData);

articlesRouter
    .route('/:article_id')
    .get(getArticleByID)
    .patch(patchArticleVote);


module.exports = articlesRouter