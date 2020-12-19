const express = require('express');
const Purchases = require('../../Models/Purchases');

async function DeletePurchase(req, res){
  var id = req.params.id;
  if (id == undefined) {
    res.status(400).send({
      Message: "Id is undefined"
    })
  }

  var result = await Purchases.deletePurchase(id);
  if (result) {
    res.status(200).send({
      Purchases: "Deleted with sucess"
    })
  }else{
    res.status(500).send({
      Message: "Error"
    })
  }

}

module.exports = DeletePurchase;
