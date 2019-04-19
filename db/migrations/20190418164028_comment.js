
exports.up = function (knex, Promise) {
    return knex.schema.createTable('comments', (commentTable) => {
        commentTable.increments('comment_id').primary()
        commentTable.string('author').notNullable()
        commentTable.foreign('author').references('users.username')
        commentTable.integer('article_id').notNullable()
        commentTable.foreign('article_id').references('articles.article_id')
        commentTable.integer('votes').defaultTo(0).notNullable()
        commentTable.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        commentTable.string('body').notNullable()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('comments')
};
