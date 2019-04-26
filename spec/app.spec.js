process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');
const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

const request = supertest(app);

describe.only('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('The API endpoint', () => {
    describe('GET - /api', () => {
      describe('Status 200 - OK', () => {
        it('Responds true when reaching correct endpoint', () => {
          return request
            .get('/api')
            .expect(200)
            .then(({ body }) => {
              expect(body.ok).to.equal(true);
            });
        });
      });
      describe('Status 404 - Not Found', () => {
        it('should return a Status 404 - Not Found with error msg if route is invalid', () => {
          return request
            .get('/api/topic')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('Route Not Found')
            });
        });
      });
    });
    describe('The topics endpoint', () => {
      describe('GET - /api/topics', () => {
        describe('Status 200 - OK', () => {
          it('Responds with an array of topic objects', () => {
            return request
              .get('/api/topics')
              .expect(200)
              .then(({ body }) => {
                expect(body.topics).to.be.an("array")
                expect(body.topics[0]).to.contain.keys('description', 'slug')
              });
          });
        });
      });
    });

    describe('The articles endpoint', () => {

      describe('GET - /api/articles', () => {
        describe('Status 200 - OK', () => {
          it('Responds with an array of article objects', () => {
            return request
              .get('/api/articles')
              .expect(200)
              .then(({ body }) => {
                expect(body.articles).to.be.an("array")
                expect(body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count')
              });
          });
        });
      });

      describe('GET - /api/articles/?author=', () => {
        describe('Status 200 - OK', () => {
          it('filters the articles by the username value', () => {
            return request
              .get('/api/articles/?author=rogersop')
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[0].author).to.eql('rogersop')
              });
          });
        });
      });

      describe('GET - /api/articles/?topic=', () => {
        describe('Status 200 - OK', () => {
          it('filters the articles by the topic value if passed valid topic', () => {
            return request
              .get('/api/articles/?topic=cats')
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[0].topic).to.eql('cats')
              });
          });
        });
      });

      describe('GET - /api/articles/?sort_by=', () => {
        describe('Status 200 - OK', () => {
          it('sorts the articles by column when passed any valid column (defaults to date)', () => {
            return request
              .get('/api/articles/?sort_by=author')
              .expect(200)
              .then(({ body }) => {
                expect(body.articles).to.be.descendingBy('author')
              });
          });
        });
      });

      describe('GET - /api/articles/?order_by=', () => {
        describe('Status 200 - OK', () => {
          it('orders articles in descending order by default', () => {
            return request
              .get('/api/articles/?order_by=desc')
              .expect(200)
              .then(({ body }) => {
                expect(body.articles).to.be.descendingBy('created_at')
              });
          });
        });
        describe('Status 400 - Bad Request', () => {
          it('should return 400 with message when passed invalid order_by query', () => {
            return request
              .get('/api/articles/?order_by=a')
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.eql('Incorrect order_by - please use asc or desc')
              });
          });
        });
      });

      describe('GET - /api/articles/:article_id', () => {
        describe('Status 200 - OK', () => {
          it('should return a Status 200 - OK with an article when passed valid article id', () => {
            return request
              .get('/api/articles/1')
              .expect(200)
              .then(({ body }) => {
                expect(body.article[0].title).to.eql('Living in the shadow of a great man')
              });
          });
        });
        describe('Status 400 - Bad Request', () => {
          it('should return a Status 400 - Bad Request with error msg when passed invalid article_id', () => {
            return request
              .get('/api/articles/a')
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.eql('Invalid article ID')
              });
          });
        });
        describe('Status 404 - Not Found', () => {
          it('should return a Status 404 - Not Found with error msg if article does not exist', () => {
            return request
              .get('/api/articles/500000')
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.eql('No article found')
              });
          });
        });
      });
    });

  });
});



