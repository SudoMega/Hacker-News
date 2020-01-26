var request = require('supertest')
   , app = require('../server')

describe("news", function(){
    it("pass a json with news", function(done){
        request(app)
        .get("/news")
        .expect(200)
        .expect(JSON,done)
    })
})