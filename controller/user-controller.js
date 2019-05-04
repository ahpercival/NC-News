const { fetchUserByID } = require('../models/user-model')

const getUserByID = (req, res, next) => {

    fetchUserByID(req.params)
        .then(user => {
            return res.status(200).send({ user });
        })
        .catch(next);
}

module.exports = getUserByID