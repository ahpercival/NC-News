const { fetchArticleData, fetchArticleByID } = require('../models/article-model')

const getArticleData = (req, res, next) => {
    const order = ['asc', 'desc']

    if (req.query.hasOwnProperty('order_by') && !order.includes(req.query.order_by)) {
        return next({ code: '4001' })
    }

    fetchArticleData(req.query)
        .then(articles => {
            return res.status(200).send({ articles })
        })
        .catch(next)

}


const getArticleByID = (req, res, next) => {
    fetchArticleByID(req.params.article_id).then(article => {
        return res.status(200).send({ article })
    })
        .catch(next)
}

module.exports = {
    getArticleData,
    getArticleByID
}