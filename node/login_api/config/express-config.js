const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const consign = require('consign');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
consign().include('api').into(app);
module.exports = app;