module.exports = class MutantException extends Error {

    constructor(message, status, info){
        super();

        this.message = message;
        this.status = status;
        this.info = info;
        this.code = 'E_MUTANT'
    }

}