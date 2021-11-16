module.exports = class MutantException extends Error {

    constructor(message, status, info){
        super();

        this.message = message;
        this.status = status;
        this.info = 'Parametros de un request ingresado es inválido.'
        this.code = 'E_PARAMETER'
    }

}