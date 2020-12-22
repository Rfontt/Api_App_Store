const express = require('express');
const PasswordToken = require('../../Models/PasswordToken');
const User = require('../../Models/UsersAdm');

async function RecoverPassword(req, res) {
  var { password, token } = req.body;

  if (password == undefined || token == undefined ) {
    res.status(400).send({
      Message: "Field is undefined"
    })
  }

  var result = await PasswordToken.validate(token);
  if (result.status) {
    await User.updatePassword(result.token.id_user, password, result.token.token);
    
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
