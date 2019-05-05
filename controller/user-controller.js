const { fetchUserByID } = require('../models/user-model')

const getUserByID = (req, res, next) => {

    fetchUserByID(req.params)
        .then(user => {
            if (user === undefined) { return Promise.reject({ code: 4045 }) }
            return res.status(200).send({ user });
        })
        .catch(next);
}

module.exports = getUserByID