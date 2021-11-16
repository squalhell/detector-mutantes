const DiagnosticModelException = require('./diagnosticModelException');
const CONSTANTS = require('../Helpers/constant');

jest.setTimeout(300000)

describe('Diagnostic Model Exception', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Sin Codigo', async () => {
        const error = new DiagnosticModelException('test', 400)
        expect(error.code).toBe(CONSTANTS.ERROR_CODES.DIAGNOSTIC.DEAFULT)
    })

})