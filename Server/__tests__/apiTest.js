const request = require('supertest');
const app = require('../server'); 

describe('GET News Route', function () {
    it('respond with json containing a list of news from the database', function (done) {
        request(app)
            .get('/news')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'text/html; charset=utf-8') 
            done();   
    });
});

