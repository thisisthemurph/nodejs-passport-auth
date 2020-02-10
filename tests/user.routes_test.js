const request = require('supertest')
const app = require('../app.js')
const { testUser, auth } = require('./config/config.js')

function testResultHasUserObjectProperties(res) {
    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('name', testUser.name)
    expect(res.body).toHaveProperty('email', testUser.email)
    expect(res.body).toHaveProperty('password')
}

module.exports.userRouteTests = () => {
    let testUserId = 0

    it('should get all users', async () => {
        const res = await request(app)
            .get('/api/user')
            .set(auth)

        expect(res.statusCode).toEqual(200)
    })

    it('should get a specific user by email', async () => {
        const res = await request(app)
            .get(`/api/user/email/${testUser.email}`)
            .set(auth)

        expect(res.statusCode).toEqual(200)
        testResultHasUserObjectProperties(res)

        testUserId = res.body._id
    })

    it('should get a specific user by id', async () => {
        const res = await request(app)
            .get(`/api/user/${testUserId}`)
            .set(auth)

        expect(res.statusCode).toEqual(200)
        testResultHasUserObjectProperties(res)
    })

    it('should delete a specific user by id', async () => {
        const res = await request(app)
            .delete(`/api/user/${testUserId}`)
            .set(auth)

        expect(res.statusCode).toEqual(200)
        testResultHasUserObjectProperties(res)
    })
}

module.exports.userRouteTestsWithErrors = () => {
    it('should not find user with non-existant email address', async () => {
        const res = await request(app)
            .get('/api/user/email/fakeemailadress@nosuchdomain.fake')
            .set(auth)

        expect(res.statusCode).toEqual(400)
    })

    it('should not get a specific user by non-existant id', async () => {
        const res = await request(app)
            .get('/api/user/thisFaleUserId1024')
            .set(auth)

        expect(res.statusCode).toEqual(400)
    })

    it('should not delete a specific user by non-existant id', async () => {
        const res = await request(app)
            .delete('/api/user/thisFaleUserId1024')
            .set(auth)

        expect(res.statusCode).toEqual(400)
    })
}

module.exports.requiresAuthenticationTests = () => {
    it('should not allow access to "/api/user" on get', async () => {
        const res = await request(app)
            .get('/api/user')

        expect(res.statusCode).toEqual(401)
    })

    it('should not allow access to "/api/user/:userId" on get', async () => {
        const res = await request(app)
            .get('/api/user/userIdPlaceholder1024')

        expect(res.statusCode).toEqual(401)
    })

    it('should not allow access to "/api/user/:userId" on delete', async () => {
        const res = await request(app)
            .delete('/api/user/userIdPlaceholder1024')

        expect(res.statusCode).toEqual(401)
    })

    it('should not allow access to "/api/user/email/:userEmail" on get', async () => {
        const res = await request(app)
            .get('/api/user/email/fakeemailadress@nosuchdomain.fake')

        expect(res.statusCode).toEqual(401)
    })
}
