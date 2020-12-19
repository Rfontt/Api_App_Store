const express = require('express');
const Purchases = require('../../Models/Purchases');

async function FindByIdPurchases(req, res){
  var id = req.params.id;
  if (id == undefined) {
    res.status(400).send({
      Message: "Undefined Field"
    })
  }

  var result = await Purchases.findByIdPurchase(id);
  if (result) {
    res.status(200).send({
      Purchase: result
    })
  }else{
    res.status(500).send({
      Message: "Error"
    })
  }

}

module.exports = FindByIdPurchases;
