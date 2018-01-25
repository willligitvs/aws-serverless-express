const request = require('supertest-as-promised');
const chai = require('chai'), expect = chai.expect;
const app = require('./app');
const httpStatus = require('http-status');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
    done();
});

describe('## User APIs', () => {
    it('should get all users (with limit and skip)', (done) => {
        request(app)
            .get('/users')
            .query({limit: 10, skip: 1})
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
    });

});