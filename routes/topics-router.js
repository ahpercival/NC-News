const topicsRouter = require("express").Router();
const { getData } = require('../controller/topic-controller')


topicsRouter
    .route('/')
    // .get((req, res) => res.send({ msg: 'hello from Topic Router' }))
    .get((req, res) => {
        res.send(getData())
    });

module.exports = topicsRouter
