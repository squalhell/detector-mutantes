const CONSTANTES = require('../Helpers/constant');

module.exports = class AuthException extends Error {

    constructor(message, status, code){
        super();

        this.message = message;
        this.status = status;
        this.info = 'Error al autenticarse con el servicio.'
        this.code = code || CONSTANTES.ERROR_CODES.AUTH.DEFAULT
    }

}