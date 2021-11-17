const request = require('supertest');
const UserModel = require('./user');
const CONSTANTS = require('../Helpers/constant');

let mockPgPromise;

jest.setTimeout(300000)
jest.mock('pg-promise', () => () => () => ({
    one: () => { return mockPgPromise },
    oneOrNone: (query) => { return mockPgPromise }
}));

describe('User Model', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('get By User Error', async () => {
        try {
            mockPgPromise = new Promise((resolve, reject) => reject({ message: 'test' }))
            await UserModel.getByUser('test');
        } catch (error) {
            expect(error.code).toBe(CONSTANTS.ERROR_CODES.AUTH.DEFAULT)
        }
    })

})