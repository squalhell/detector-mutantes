const jwt = require('jsonwebtoken');
const JWTException = require('../Exceptions/jwtException')

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');

    if (!token) {
        throw new JWTException("request no autorizado.", 403)
    }

    try {
        const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.JWT_PUBLIC_KEY}\n-----END PUBLIC KEY-----`
        const decode = jwt.verify(token, publicKey, {algorithms: 'RS256'});
        req.user = decode;

        return next();
    } catch (error) {
        throw new JWTException("Token inválido", 401)
    }
}

module.exports = {
    verifyToken
}