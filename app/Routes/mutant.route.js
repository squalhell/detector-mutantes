const express = require('express');
const { verifyToken } = require('../Middleware/jwt-auth');
const router = express.Router();

const MutantHttpController = require('../Controllers/Http/mutant');

router.post('/', verifyToken, async (req, res, next) => {
    try {
        const result = await new MutantHttpController().detect(req.body);
        return res.status(200).send({ status: 'OK', message: 'Mutante detectado!!!!' })
    } catch (error) {
        next(error)
    }
})

module.exports = router;