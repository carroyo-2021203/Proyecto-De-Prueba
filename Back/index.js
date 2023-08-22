'use strict'

const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');


mongoConfig.connect();
app.initServer();
