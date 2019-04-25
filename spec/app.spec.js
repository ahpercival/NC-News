process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');
const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

const request = supertest(app);

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/api', () => {
    it('GET status:200', () => {
      return request
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });

    describe('GET /api/topics', () => {
      it('GET - Status 200', () => {
        return request
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.be.an("array")
            expect(body.topics[0]).to.contain.keys('description', 'slug')
          });
      });
    });

    describe('GET /api/articles', () => {
      it('GET - Status 200', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.an("array")
            expect(body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count')
          });
      });
    });

    describe('GET /api/articles/?author=rogersop', () => {
      it('GET - Status 200 - filters the articles by the username value', () => {
        return request
          .get('/api/articles/?author=rogersop')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].author).to.eql('rogersop')
          });
      });
    });

    describe('GET /api/articles/?topic=cats', () => {
      it('GET - Status 200 - filters the articles by the topic value', () => {
        return request
          .get('/api/articles/?topic=cats')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].topic).to.eql('cats')
          });
      });
    });

    describe('GET /api/articles/?sort_by=author', () => {
      it('GET - Status 200 - sorts the articles by any valid column (defaults to date)', () => {
        return request
          .get('/api/articles/?sort_by=author')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy('author')
          });
      });
    });

    describe('GET /api/articles/?order_by=desc', () => {
      it('GET - Status 200 - orders articles in descending order by default', () => {
        return request
          .get('/api/articles/?order_by=desc')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy('created_at')
          });
      });
    });
    describe('GET - Status 400 Bad Request - /api/articles/?order_by=a', () => {
      it('should return 400 with message', () => {
        return request
          .get('/api/articles/?order_by=a')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.eql('Incorrect order_by - please use asc or desc')
          });
      });
    });

    describe('GET - Status 200 - ', () => {

    });


  });
});

describe('The articles endpoint', () => {

  describe('articles query by articleId', () => {
    it.only('should return a status 200 with an article', () => {
      return request
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.article[0].title).to.eql('Living in the shadow of a great man')
        });
    });
    xit('should return a status 400 with error msg', () => {
      return request
        .get('/api/articles/?order_by=a')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql('Incorrect order_by - please use asc or desc')
        });
    });
  });
});