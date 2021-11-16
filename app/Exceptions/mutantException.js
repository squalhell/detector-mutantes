const CONSTANTES = require('../Helpers/constant');

module.exports = class MutantException extends Error {

    constructor(message, status, code){
        super();

        this.message = message;
        this.status = status;
        this.info = 'Error en la lógica de mutantes.'
        this.code = code || CONSTANTES.ERROR_CODES.MUTANT.DEAFULT
    }

}