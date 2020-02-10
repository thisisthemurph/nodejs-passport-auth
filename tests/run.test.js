const { userAuthTests, userAuthTestsWithErrors } = require('./auth.routes_test.js')
const { userRouteTests, userRouteTestsWithErrors, requiresAuthenticationTests } = require('./user.routes_test.js')

describe('User auth tests', userAuthTests)
describe('User authentication with errors', userAuthTestsWithErrors)

describe('User route tests', userRouteTests)
describe('User route tests with errors', userRouteTestsWithErrors)
describe('Accessing protected user routes without auth-token', requiresAuthenticationTests)
