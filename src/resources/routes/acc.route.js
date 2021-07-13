const express = require('express');
const route = express.Router();
const controller = require('../../app/controllers/acc.controller');
route.get('/login', controller.getLogin);
route.post('/login', controller.postLogin);
route.get('/register', controller.getRegister);
route.post('/register', controller.postRegister);
route.get('/logout', controller.logout);

module.exports = route;