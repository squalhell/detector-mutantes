const MutantException = require('./mutantException');
const CONSTANTS = require('../Helpers/constant');

// jest.setTimeout(300000)

describe('Mutant Model Exception', () => {

    // afterEach(() => {
    //     jest.restoreAllMocks();
    // });

    test('Sin Codigo', async () => {
        const error = new MutantException('test', 400)
        expect(error.code).toBe(CONSTANTS.ERROR_CODES.MUTANT.DEFAULT)
    })

})