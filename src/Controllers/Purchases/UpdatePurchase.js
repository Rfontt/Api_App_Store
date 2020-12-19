const express = require('express');
const Purchases = require('../../Models/Purchases');

async function UpdatePurchases(req, res){
  var { purchase, pricePurchase, pieceQuantity,
        payment, installment, valueToSell } = req.body;
  var id = req.params.id;

  if (id == undefined && purchase == undefined || pricePurchase == undefined ||pieceQuantity == undefined ||
      payment == undefined || installment == undefined || valueToSell == undefined ) {
        res.status(400).send({
          Message: "undefined fields"
        })
    return;
  }

  var result = await Purchases.updatePurchases(id, purchase, pricePurchase, pieceQuantity, payment, installment, valueToSell);
  if (result) {
    res.status(201).send({
      Message: "Updated with sucess"
    })
  }else{
    res.status(500).send({
      Message: "Error"
    })
  }

}

module.exports = UpdatePurchases;
