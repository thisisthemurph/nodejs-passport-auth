const request = require('supertest')
const app = require('../app.js')
const { testUser, auth } = require('./config/config.js')

module.exports.userAuthTests = () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(testUser)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name', testUser.name)
        expect(res.body).toHaveProperty('email', testUser.email)
        expect(res.body).toHaveProperty('password')
    })

    it('should log in a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            })

        expect(res.statusCode).toEqual(200)
        expect(res.header).toHaveProperty('auth-token')

        auth['auth-token'] = res.header['auth-token']
    })
}

module.exports.userAuthTestsWithErrors = () => {
    it('should not create a new user - insufficient data', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: testUser.email
            })

        expect(res.statusCode).toEqual(400)
    })

    it('should not log in a user - insufficient data', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email
            })

        expect(res.statusCode).toEqual(400)
    })
}
