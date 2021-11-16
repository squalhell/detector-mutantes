const express = require('express');

const router = express.Router();

const StatHttpController = require('../Controllers/Http/stat');

router.get('/', async (req, res, next) => {
    try {
        return res.status(200).send(await StatHttpController.getStats());
    } catch (error) {
        next(error)
    }
})

module.exports = router;