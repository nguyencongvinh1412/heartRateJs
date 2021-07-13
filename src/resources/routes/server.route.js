const express = require('express');
const route = express.Router();
const controller = require('../../app/controllers/server.controller');

route.get('/checkpass', controller.checkpass);
route.get('/training', controller.training);

module.exports = route;