const { fetchArticleData } = require('../models/article-model')

const getArticleData = (req, res, next) => {
    fetchArticleData(req.query)
        .then(articles => {
            return res.status(200).send({ articles })
        })
        .catch(err => { console.log(err) })

}

module.exports = {
    getArticleData
}