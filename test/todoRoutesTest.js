const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:8080');

describe('Todo Routes', function() {
    describe('#POST', function() {
        it('should create a new Todo', function(done) {
            api.post('/todo')
                .set('Accept', 'application/json')
                .send({
                    name: 'Carl',
                    task: 'do the laundry'
                })
                .expect(200)
                .end(function(err, response) {
                    expect(response.body.name).to.be.equal('Carl');
                    expect(response.body.task).to.be.equal('do the laundry');
                    expect(response.body._id).to.not.be.undefined;
                    done();
                });
        });
    });
});