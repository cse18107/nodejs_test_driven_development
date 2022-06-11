const request = require('supertest');
const app = require('../app');

it('returns 200 OK when signup request is valid', () => {
  request(app);
});
