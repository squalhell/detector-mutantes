const express = require('express');

const router = express.Router();

const StatHttpController = require('../Controllers/Http/stat');

router.get('/', async (req, res) => {
    return res.status(200).send({ status: 'OK', message: 'Servicio ejecutado con éxito.' })
})

module.exports = router;