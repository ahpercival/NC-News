const topicsRouter = require("express").Router();
const { getTopicData } = require('../controller/topic-controller')


topicsRouter
    .route('/')
    .get(getTopicData);

module.exports = topicsRouter
