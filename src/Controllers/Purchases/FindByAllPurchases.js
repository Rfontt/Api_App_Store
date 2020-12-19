const express = require('express');
const Purchases = require('../../Models/Purchases');

async function FindByAllPurchases(req, res){
  var result = await Purchases.findByAllPurchases();
  if (result) {
    res.status(200).send({
      Purchases: result
    })
  }else{
    res.status(500).send({
      Message: "Error"
    })
  }

}

module.exports = FindByAllPurchases;
