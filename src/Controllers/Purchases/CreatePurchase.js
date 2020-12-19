const express = require('express');
const Purchases = require('../../Models/Purchases');

async function CreatePurchases(req, res){
  var { purchase, pricePurchase, pieceQuantity,
        payment, installment, valueToSell } = req.body;

  if (purchase == undefined || pricePurchase == undefined ||pieceQuantity == undefined ||
      payment == undefined || installment == undefined || valueToSell == undefined ) {
        res.status(400).send({
          Message: "undefined fields"
        })
    return;
  }

  var result = await Purchases.createPurchase(purchase, pricePurchase, pieceQuantity, payment, installment, valueToSell);
  if (result) {
    res.status(201).send({
      Message: "Created with sucess"
    })
  }else{
    res.status(500).send({
      Message: "Error"
    })
  }

}

module.exports = CreatePurchases;
