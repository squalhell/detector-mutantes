
const AuthBusiness = require('../Business/auth');
const ParameterException = require('../../Exceptions/parameterException');
const AuthException = require('../../Exceptions/authException');
const CONSTANTS = require('../../Helpers/constant');

const Joi = require('joi');

const loginSchema = Joi.object().keys({
    user: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = class AuthHttp {
    constructor() { }

    async login(body) {
        const result = loginSchema.validate(body);

        if (result.error) {
            throw new ParameterException('Datos ingresados no son válidos', 400);
        }

        const login = new AuthBusiness(body.user, body.password);

        return await login.getToken();
    }
}