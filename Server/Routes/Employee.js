const express = require('express');
const route = express.Router();

const employeeController = require('../Controllers/Employee');

route.post('/add', employeeController.addEmployee)

route.get('/', employeeController.allEmployee)

route.get('/by/:id', employeeController.oneEmployee)

route.put('/edit/:id', employeeController.editEmployee)

route.delete('/delete/:id', employeeController.employee_delete)

module.exports = route;



