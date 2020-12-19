const express = require('express');
const PasswordToken = require('../../Models/PasswordToken');
const User = require('../../Models/UsersAdm');

async function RecoverPassword(req, res) {
  var { password, token } = req.body;
  var id = req.params.id;

  if ( id == undefined || password == undefined || token == undefined ) {
    res.status(400).send({
      Message: "Field is undefined"
    })
  }

  var result = await PasswordToken.validate(token);
  if (result.status) {
    var newPassword = await User.updatePassword(id, password, result.token.token);
    res.status(201).send({
      Message: "Password updated"
    })
  }else {
    res.status(400).send({
      Message: "Token invaled"
    })
  }
}

module.exports = RecoverPassword;
