const express = require('express');
const Customers = require('../../Models/Customers');

async function DeleteCustomer(req, res) {
  var id = req.params.id;

  if (id == undefined) {
    res.status(400).send({
      Message: "Id is undefined"
    })
  }

  var result = await Customers.deleteCustomer(id);
  if (result) {
    res.status(200).send({
      Message: "Customer deleted with sucess"
    })
  }else {
    res.status(500).send({
      Message: "Error"
    })
  }
}

module.exports = DeleteCustomer;
