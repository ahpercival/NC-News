const data = require('../data');
const { formatDate, createRef, dataFormatter, renameKeys } = require("../../utils/seeding_functions")


exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('topics')
        .insert(data.topicData)
        .returning('*')
    }).then(() => {
      return knex('users')
        .insert(data.userData)
        .returning('*')
    }).then(() => {
      return knex('articles')
        .insert(formatDate(data.articleData))
        .returning('*')
    }).then((articleRows) => {
      const { commentData } = data
      const amendedDate = formatDate(commentData)
      const refObj = createRef(articleRows, 'title', 'article_id')
      const formattedData = dataFormatter(amendedDate, refObj)
      const dataToSeed = renameKeys(formattedData, 'created_by', 'author')

      return knex('comments')
        .insert(dataToSeed)
        .returning('*')
    })
};
