const request = require('supertest');

jest.setTimeout(300000)
jest.mock('jsonwebtoken')
jest.mock('pg-promise', () => () => () => ({
    one: () => {
        return null
    },
    oneOrNone: (query) => {
        return null
    }
}));

const { app } = require('../../jest-server');

describe('Mutant', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('detectar mutante con DNA mutante', async () => {
        const response = await request(app).post("/api/v1/mutant").set('authorization', 'TOKEN-TEST').send({
            dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
        });

        expect(response.statusCode).toBe(200)
    })

    test('detectar mutante con DNA humano', async () => {
        const response = await request(app).post("/api/v1/mutant").set('authorization', 'TOKEN-TEST').send({
            dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"]
        });

        expect(response.statusCode).toBe(403)
    })

    test('Parametros ingresados inválido', async () => {
        const response = await request(app).post("/api/v1/mutant").set('authorization', 'TOKEN-TEST').send({
            dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG", 1]
        });

        expect(response.statusCode).toBe(400)
    })

    test('Matriz de NxM', async () => {
        const response = await request(app).post("/api/v1/mutant").set('authorization', 'TOKEN-TEST').send({
            dna: ["ATGCGA", "CAGTGC", "TTZTGT", "AGAAGG", "CCCCTA", "TCACTG", "TCACTG"]
        });

        expect(response.statusCode).toBe(400)
    })

    test('DNA con elementos que no son bases nitrogenadas', async () => {
        const response = await request(app).post("/api/v1/mutant").set('authorization', 'TOKEN-TEST').send({
            dna: ["ATGCGA", "CAGTGC", "TTZTGT", "AGAAGG", "CCCCTA", "TCACTG"]
        });

        expect(response.statusCode).toBe(400)
    })

    test('DNA menos a 4x4', async () => {
        const response = await request(app).post("/api/v1/mutant").set('authorization', 'TOKEN-TEST').send({
            dna: ["ATG", "CAG", "TTA"]
        });

        expect(response.statusCode).toBe(400)
    })

})