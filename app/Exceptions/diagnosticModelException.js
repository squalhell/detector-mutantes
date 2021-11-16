const CONSTANTES = require('../Helpers/constant');

module.exports = class DiagnosticException extends Error {

    constructor(message, status, code){
        super();

        this.message = message;
        this.status = status;
        this.info = 'Error en el modelo diagnostics'
        this.code = code || CONSTANTES.ERROR_CODES.DIAGNOSTIC.DEFAULT
    }

}