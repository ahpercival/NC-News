const topicsRouter = require("express").Router();


topicsRouter
    .route("/")
    .get((req, res) => res.status(200).send({ msg: 'hello from Topic Router' }))

module.exports = topicsRouter