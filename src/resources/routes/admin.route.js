const express = require('express');
const route = express.Router();
const controller = require('../../app/controllers/admin.controller');

route.get('/controller', controller.controller);
route.get('/list_user', controller.listUser);
route.get('/detail/:id', controller.detailUser);
route.post('/deleteUser/:id', controller.deleteUser);
route.post('/repairUser/:id', controller.repairUser);
route.get('/addUser', controller.getAddUser);
route.post('/addUser', controller.postAddUser);
route.get('/measureHistoryList', controller.measureHistoryList);
route.get('/measureHistory/:id', controller.measureHistory);

route.get('/add', controller.add);

module.exports = route;