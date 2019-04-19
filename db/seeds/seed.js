const data = require('../data');

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
    })//.then(() => {
    //   console.log(data.articleData)
    //   return knex('articles')
    //     .insert(data.articleData)
    //     .returning('*')
    // })
    .then((data) => { console.log(data) })
};
