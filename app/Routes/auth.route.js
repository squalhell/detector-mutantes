const express = require('express');
const router = express.Router();
const AuthHttpBusiness = require('../Controllers/Http/auth');

router.post('/login', async (req, res, next) => {
    try {
        const result = await new AuthHttpBusiness().login(req.body);
        return res.status(200).send({ status: 'OK', message: 'Usuario logeado con éxito', ...result })
    } catch (error) {
        next(error)
    }
})

module.exports = router;