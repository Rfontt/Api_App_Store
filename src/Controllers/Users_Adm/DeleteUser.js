const express = require('express');
const User = require('../../Models/UsersAdm');

async function DeleteUser(req, res) {
  var id = req.params.id;

  if (id == undefined) {
    res.status(400).send({
      Message: "Id is undefined"
    })
  }

  var result = await User.deleteUser(id);
  if (result) {
    res.status(200).send({
      Message: "User deleted with sucess"
    })
  }else {
    res.status(500).send({
      Message: "Error"
    })
  }
}

module.exports = DeleteUser;
