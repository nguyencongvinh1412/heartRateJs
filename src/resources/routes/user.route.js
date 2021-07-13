const express = require('express');
const route = express.Router();
const controller = require('../../app/controllers/user.controller');

route.get('/controller', controller.controller);
route.get('/detail', controller.detail);
route.post('/repairUser', controller.repairUser);
route.get('/measureHistory', controller.measureHistory);

module.exports = route;