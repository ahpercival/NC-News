const connection = require("../db/connection");


exports.fetchTopicData = () => {
    return connection.select('*').from('topics')
}