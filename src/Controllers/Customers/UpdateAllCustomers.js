const express = require('express');
const Customers = require('../../Models/Customers');

async function UpdateAllCustomers(req, res) {
  var { name, purchase, price, amount, date } = req.body;
  var id = req.params.id;

  if (id == undefined) {
    res.status(400).send({
      Message: "Id is undefined"
    })
    return;
  }

  var result = await Customers.updateCustomer(id, name, purchase, price, amount, date);
  if (result != undefined) {
    res.status(201).send({
      Message: "Updated with sucess"
    })
  }else {
    res.status(500).send({
      Message: "Error"
    })
  }
}

module.exports = UpdateAllCustomers;
