const express = require('express');
const User = require('../../Models/UsersAdm');

async function UpdateNameAndEmailUser(req, res) {
  var {name, email} = req.body;
  var id = req.params.id;

  if (id == undefined || name == undefined || email == undefined) {
    res.status(400).send({
      Message: "Fields undefined"
    })
  }

  var result = await User.updateNameAndEmailUser(id, name, email);
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

module.exports = UpdateNameAndEmailUser;

