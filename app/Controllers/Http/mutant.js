
const MutantBusiness = require('../Business/mutant');
const ParameterException = require('../../Exceptions/parameterException');
const MutantException = require('../../Exceptions/mutantException');
const CONSTANTS = require('../../Helpers/constant');

const Joi = require('joi');

const detectSchema = Joi.object().keys({
    dna: Joi.array().items(Joi.string()).required()
})

module.exports = class MutantHttp {
    constructor() { }

    static async detect(body) {
        const result = detectSchema.validate(body);

        if (result.error) {
            throw new ParameterException('Datos ingresados no son válidos', 400);
        }

        const mutant = new MutantBusiness(body.dna);
        const errors = await mutant.isValidDna();

        for (const key of Object.keys(errors)) {
            const errorMutant = errors[key]
            if (errorMutant) {
                throw new MutantException(errorMutant.message, 400, errorMutant.code)
            }
        }

        if (await mutant.isMutant()) {
            return true
        } else {
            throw new MutantException('DNA entregado pertence a un simple humano', 403, CONSTANTS.ERROR_CODES.MUTANT.NOT_MUTANT);
        }
    }
}