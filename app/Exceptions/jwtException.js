const CONSTANTES = require('../Helpers/constant');

module.exports = class JWTException extends Error {

    constructor(message, status, code){
        super();

        this.message = message;
        this.status = status;
        this.info = 'Error al validar jwt'
        this.code = code || CONSTANTES.ERROR_CODES.JWT.DEFAULT
    }

}