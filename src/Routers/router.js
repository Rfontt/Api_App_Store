const express = require('express');
const router = express.Router();

const Users = require('./Users');
const Customers = require('./Customers');
const Purchases = require('./Purchases');

router.use(Users);
router.use(Customers);
router.use(Purchases);


module.exports = router;
