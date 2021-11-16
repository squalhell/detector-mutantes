const request = require('supertest');
const DiagnosticsModel = require('./diagnostics');
const CONSTANTS = require('../Helpers/constant');

let mockPgPromise;

jest.setTimeout(300000)
jest.mock('pg-promise', () => () => () => ({
    one: () => { return mockPgPromise },
    oneOrNone: (query) => { return mockPgPromise }
}));

describe('Diagnostics Model', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Stats Error', async () => {
        try {
            mockPgPromise = new Promise((resolve, reject) => reject({ message: 'test' }))
            await DiagnosticsModel.stats();
        } catch (error) {
            expect(error.code).toBe(CONSTANTS.ERROR_CODES.DIAGNOSTIC.STATS)
        }
    })

    test('Create datos inválidos', async () => {
        try {
            const diagnostics = new DiagnosticsModel();
            await diagnostics.create({})
        } catch (error) {
            expect(error.code).toBe(CONSTANTS.ERROR_CODES.DIAGNOSTIC.DATA_CREATE)
        }
    })

})