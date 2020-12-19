const express = require('express');
const Customers = require('../../Models/Customers');

async function FindByIdCustomer(req, res) {
  var result = await Customers.findByAllCustomers();
  if (result) {
    res.status(200).send({
      Customers: result
    })
  }else{
    res.status(500).send({
      Message: "Falha"
    })
  }
}

module.exports = FindByIdCustomer;
