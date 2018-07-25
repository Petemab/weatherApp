const express = require( 'express');
const app = express();


const router = require('./config/router');
const { port, dbURI } = require('./config/environment');


const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

app.use('/api', router);

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
