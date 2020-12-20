const express = require('express');
const customers = express.Router();
const Authorization = require('../Middleware/UserAdm');

const CreateCustomersController = require('../Controllers/Customers/CreateCustomer');
const FindByAllCustomersController = require('../Controllers/Customers/FindByAllCustomers');
const FindByIdCustomersController = require('../Controllers/Customers/FindByIdCustomer');
const UpdateCustomersController = require('../Controllers/Customers/UpdateAllCustomers');
const DeleteCustomerController = require('../Controllers/Customers/DeleteCustomer');

customers.post("/customer", Authorization, CreateCustomersController);
customers.get("/customer", Authorization, FindByAllCustomersController);
customers.get("/customer/:id", FindByIdCustomersController);
customers.put("/customer/:id", Authorization, UpdateCustomersController);
customers.delete("/customer/:id", Authorization, DeleteCustomerController);

module.exports = customers;
