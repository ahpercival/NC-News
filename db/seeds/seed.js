const data = require('../data');
const { formatDate, createRef, formatArticleID, renameKeys } = require("../../utils/seeding_functions")


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
      const dateFormatted = formatDate(commentData)
      const refObject = createRef(articleRows, 'title', 'article_id')
      const articleIdAdded = formatArticleID(dateFormatted, refObject)
      const dataReadyToSeed = renameKeys(articleIdAdded, 'created_by', 'author')
      return knex('comments')
        .insert(dataReadyToSeed)
        .returning('*')
    })
};
