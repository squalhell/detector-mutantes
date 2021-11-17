const request = require('supertest');
const bcrypt = require('bcrypt');

let mockPgPromise;
let mockBcrypt;
jest.setTimeout(300000);
jest.mock('jsonwebtoken')

jest.mock('bcrypt');

jest.mock('pg-promise', () => () => () => ({
    one: () => { return mockPgPromise },
    oneOrNone: (query) => { return mockPgPromise }
}));

const { app } = require('../../jest-server');

describe('Auth', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Login', async () => {
        mockPgPromise = new Promise((resolve, reject) => resolve({ user: 'test', password: 'test' }))
        bcrypt.compare.mockResolvedValue(new Promise((resolve, reject) => resolve(true)))
        const response = await request(app).post("/api/v1/auth/login").send({ user: 'test', password: 'test' });
        expect(response.statusCode).toBe(200)
    })

    test('Login ERROR', async () => {
        mockPgPromise = new Promise((resolve, reject) => resolve({ user: 'test', password: 'test' }))
        bcrypt.compare.mockResolvedValue(new Promise((resolve, reject) => resolve(false)))
        const response = await request(app).post("/api/v1/auth/login").send({ user: 'test', password: 'test' });
        expect(response.statusCode).toBe(401)
    })

})