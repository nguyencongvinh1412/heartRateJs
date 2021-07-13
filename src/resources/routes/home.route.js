const express = require('express');
const route = express.Router();
const controller = require('../../app/controllers/home.controller');

route.get('/', controller.home);
route.get('/contact', controller.contact)


module.exports = route;