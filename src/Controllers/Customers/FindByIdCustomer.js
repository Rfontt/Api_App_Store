const express = require('express');
const Customers = require('../../Models/Customers');

async function FindByIdCustomer(req, res) {
  var id = req.params.id;

  if (id == undefined) {
    res.status(400).send({
      Message: "Id is undefined"
    })
  }

  var result = await Customers.findByIdCustomer(id);

  if (result) {
    res.status(200).send({
      Customer: result
    })
  }else {
    res.status(404).send({
      Message: "Not found"
    })
  }
}

module.exports = FindByIdCustomer;
