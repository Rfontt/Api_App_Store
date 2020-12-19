const express = require('express');
const User = require('../../Models/UsersAdm');

async function CreateUser(req, res){
  var { name, email, password } = req.body;

  if (name == undefined || email == undefined || password == undefined) {
    res.status(400).send({
      Message: "undefined name, email and password"
    })
    return;
  }

  var emailExists = await User.findByEmail(email);
  if (emailExists != undefined) {
    res.status(406).send({
      Message: "Email already exists"
    })
  }else {
    await User.newUserAdm(name, email, password);
    res.status(201).send({
      Message: "User created"
    })
  }
}

module.exports = CreateUser;
