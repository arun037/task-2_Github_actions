const request = require('supertest');
const app = require('./server');

describe('GET /', () => {
    it('should return Hello, Nodejs application deployed through GitHub Actions!', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Hello, Nodejs application deployed through GitHub Actions!');
    });
});