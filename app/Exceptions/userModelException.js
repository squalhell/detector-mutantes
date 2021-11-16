const CONSTANTES = require('../Helpers/constant');

module.exports = class UserException extends Error {

    constructor(message, status, code){
        super();

        this.message = message;
        this.status = status;
        this.info = 'Error al procesar los datos del usuario.'
        this.code = code || CONSTANTES.ERROR_CODES.AUTH.DEFAULT
    }

}