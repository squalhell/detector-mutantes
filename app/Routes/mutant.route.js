const express = require('express');

const router = express.Router();

const MutantHttpController = require('../Controllers/Http/mutant');

router.post('/', async (req, res, next) => {
    try {
        const result = await MutantHttpController.detect(req.body);
        return res.status(200).send({ status: 'OK', message: 'Mutante detectado!!!!' })
    } catch (error) {
        next(error)
    }
})

module.exports = router;