const articlesRouter = require("express").Router();
const { getArticleData, getArticleByID } = require('../controller/article-controller')

articlesRouter
    .route('/')
    .get(getArticleData);

articlesRouter
    .route('/:article_id')
    .get(getArticleByID);

module.exports = articlesRouter