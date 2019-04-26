const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handle500, handle400 } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use(handle400)
// handleCustomErrors (if err.status)
// handlePsqlErrors (check err.code to find out what to do)
app.use(handle500);


module.exports = app;
