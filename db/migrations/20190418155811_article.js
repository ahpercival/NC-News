
exports.up = function (knex, Promise) {
    return knex.schema.createTable('articles', (articleTable) => {
        articleTable.increments('article_id').primary()
        articleTable.string('title').notNullable()
        articleTable.string('body').notNullable()
        articleTable.integer('votes').defaultTo(0).notNullable()
        articleTable.string('topic').notNullable()
        articleTable.foreign('topic').references('topics.slug')
        articleTable.string('author').notNullable()
        articleTable.foreign('author').references('users.username')
        articleTable.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('articles')
};
