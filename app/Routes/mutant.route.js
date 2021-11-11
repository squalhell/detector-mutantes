const express = require('express');

const router = express.Router();

const MutantHttpController = require('../Controllers/Http/mutant');

router.post('/', async (req, res, next) => {
    try {
        const result = await MutantHttpController.detect(req.body);
        throw new Error('TEST')
        return res.status(200).send({ status: 'OK', message: 'Servicio ejecutado con éxito.' })
    } catch (error) {
        next(error)
    }
})

module.exports = router;