const bcrypt = require('bcrypt');
const Logger = require('../../../config/logger')
const CONSTANTS = require('../../Helpers/constant');
const UserModel = require('../../Models/user');
const AuthException = require('../../Exceptions/authException')
const jwt = require('jsonwebtoken');

module.exports = class UserBusiness {

    constructor(user, password) {
        this.user = user;
        this.password = password;
    }

    async getToken() {
        const user = await UserModel.getByUser(this.user);
        if (await bcrypt.compare(this.password, user.password)) {
            const privateKey = `-----BEGIN RSA PRIVATE KEY-----\n${process.env.JWT_PRIVATE_KEY}\n-----END RSA PRIVATE KEY-----`
            const token = jwt.sign({ user: this.user }, privateKey, { expiresIn: "24h", algorithm: 'RS256' });
            return {
                token,
                type: 'Bearer'
            }
        } else {
            throw new AuthException('credenciales ingresadas son incorrecta.', 401);
        }
    }

}