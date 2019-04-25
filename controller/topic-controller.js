const { fetchTopicData } = require('../models/topic-model')

const getTopicData = (req, res, next) => {
    fetchTopicData()
        .then(topics => {
            return res.status(200).send({ topics });
        })
        .catch(next);
}

module.exports = {
    getTopicData
}
