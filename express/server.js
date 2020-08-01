'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());


app.use('/', (req, res) => {
  res.send("Hello");
});
module.exports.handler = serverless(app);
