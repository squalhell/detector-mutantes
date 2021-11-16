const UserModelException = require('../Exceptions/userModelException');
const CONSTANTS = require('../Helpers/constant');
const { db } = require('../../config/database');
const moment = require('moment-timezone');
const Logger = require('../../config/logger');

module.exports = class UserModel {

    constructor() {
        this.primaryKey = 'id';
        this.table = 'user'
    }

    static async getByUser(user) {
        try {
            return await db.oneOrNone('SELECT "user", "password" FROM "user" WHERE "user" = $1', [user]);
        } catch (error) {
            Logger.error(error.message)
            throw new UserModelException('Error al buscar el usuario', 403, CONSTANTS.ERROR_CODES.DIAGNOSTIC.STATS)
        }
    }

}