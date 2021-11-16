const request = require('supertest');

let mockPgPromise;
jest.setTimeout(300000);
jest.mock('pg-promise', () => () => () => ({
    one: () => { return mockPgPromise },
    oneOrNone: (query) => { return mockPgPromise }
}));

const { app } = require('../../jest-server');

describe('Stats', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Obtener estadisticas', async () => {
        mockPgPromise = new Promise((resolve, reject) => resolve({}))
        const response = await request(app).get("/api/v1/stats");
        expect(response.statusCode).toBe(200)
    })

})