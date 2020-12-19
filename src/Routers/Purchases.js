const express = require('express');
const purchases = express.Router();
const Authorization = require('../Middleware/UserAdm');

const CreatePurchasesController = require('../Controllers/Purchases/CreatePurchase');
const FindByAllPurchasesController = require('../Controllers/Purchases/FindByAllPurchases');
const FindByIdPurchasesController = require('../Controllers/Purchases/FindByIdPurchases');
const UpdatePurchasesControllers = require('../Controllers/Purchases/UpdatePurchase');
const DeletePurchaseController = require('../Controllers/Purchases/DeletePurchase');

purchases.post("/purchase", Authorization, CreatePurchasesController);
purchases.get("/purchase", FindByAllPurchasesController);
purchases.get("/purchase/:id", FindByIdPurchasesController);
purchases.put("/purchase/:id", Authorization, UpdatePurchasesControllers);
purchases.delete("/purchase/:id", Authorization, DeletePurchaseController);


module.exports = purchases;
