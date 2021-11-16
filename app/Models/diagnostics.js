const Joi = require('joi');
const DiagnosticException = require('../Exceptions/diagnosticModelException');
const CONSTANTS = require('../Helpers/constant');
const { db } = require('../../config/database');
const moment = require('moment-timezone');
const Logger = require('../../config/logger');

const diagnosticSchema = Joi.object().keys({
    id: Joi.number,
    input: Joi.array().items(Joi.string().required()),
    mutant: Joi.boolean().required()
})

module.exports = class DiagnosticModel {

    constructor() {
        this.primaryKey = 'id';
        this.table = 'diagnostics'
    }

    static async stats() {
        try {
            return await db.one('SELECT count(mutant = true or null) as mutant, count(mutant = false or null) as human, round(count(mutant = true or null) * 1.0 /  count(mutant = false or null) * 1.0, 2) as ratio from diagnostics');
        } catch (error) {
            Logger.error(error.message)
            throw new DiagnosticException('Error al calcular estadísticas', 403, CONSTANTS.ERROR_CODES.DIAGNOSTIC.STATS)
        }
    }

    async create(data) {
        try {
            const result = diagnosticSchema.validate(data);

            if (result.error) {
                throw new DiagnosticException('Datos a guardar son inválidos', 403, CONSTANTS.ERROR_CODES.DIAGNOSTIC.DATA_CREATE);
            }

            const exist = await db.oneOrNone('SELECT id from diagnostics WHERE input = $1', [JSON.stringify(data.input)]);

            if (!exist) {
                data.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
                await db.one('INSERT INTO diagnostics(input, mutant, created_at) VALUES($1, $2, $3) RETURNING id', [JSON.stringify(data.input), data.mutant, data.created_at]);
            }
        } catch (error) {
            Logger.error(error.message)
            throw new DiagnosticException('No se pudo crear el registro de mutante', 403, CONSTANTS.ERROR_CODES.DIAGNOSTIC.DATA_CREATE)
        }
    }



}