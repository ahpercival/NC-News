const connection = require("../db/connection");

exports.fetchUserByID = (userID) => {
    return connection('users')
        .where('users.username', '=', userID.username)
        .returning('*')
        .then(([result]) => result)
}