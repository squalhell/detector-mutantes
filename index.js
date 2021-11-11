require('dotenv').config();
global.appRoot = __dirname.replace(/'\'/g, "/");
const moment = require('moment-timezone');
moment.tz.setDefault(process.env.TIMEZONE);

const express = require('express');
const cors = require('cors');

const logger = require('./config/logger');
const routes = require('./config/routes');
const { CustomErrors } = require('./config/handler');

logger.info('Starting MUTANT-DETECTOR...');


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Authorization, Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader('Content-Type', 'application/json');
    return next();
});

app.use(cors());
app.use(express.json());

app.use('/api', routes.v1);
app.use(CustomErrors);

// Ruta por defecto para páginas no encontradas
app.use((req, res) => {
    return res.status(404).send({ status: 'ERROR', message: 'Página no encontrada' })
})

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    logger.info(`Listening on the port [${PORT}]...`);
});

module.exports = { app }