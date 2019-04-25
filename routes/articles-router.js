const articlesRouter = require("express").Router();
const { getArticleData } = require('../controller/article-controller')

articlesRouter
    .route('/')
    .get(getArticleData);



module.exports = articlesRouter