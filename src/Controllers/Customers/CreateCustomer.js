const express = require('express');
const Customers = require('../../Models/Customers');

async function createCustomers(req, res){
  var { name, purchase, price, amount, date } = req.body;

  result = await Customers.newCustomer(name, purchase, price, amount, date);
  if (result != undefined) {
    res.status(201).send({
      Message: "Created with sucess"
    })
  }else {
    res.status(500).send({
      Message: "Error"
    })
  }
}

module.exports = createCustomers;
