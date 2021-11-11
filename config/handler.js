const logger = require('./logger');
const DEFAULT_CODE = 'E_DEFAULT'

exports.CustomErrors = (err, req, res, next) => {
    logger.error(` Error al ejecutar el servicio
    Message: ${err.message}
    CODE: ${err.code || DEFAULT_CODE}
    Stack: ${err.stack}`);
    res.status(err.status || 500);
    res.send({
        status: 'ERROR',
        code: err.code || DEFAULT_CODE,
        message: err.message
    });
};