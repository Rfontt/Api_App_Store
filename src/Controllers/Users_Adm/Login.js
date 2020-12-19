const express = require('express');
const User = require('../../Models/UsersAdm');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function Login(req, res) {
  var { email, password } = req.body;

  if (email == undefined || password == undefined) {
  	res.status(400).send({
  		Messagem: "Field undefined"
  	})
  }

  var userExists = await User.findByEmail(email);
  if (userExists != undefined) {
  	var passwordExists = await bcrypt.compare(password, userExists.password);

  	if (passwordExists) {
      var tokengenerated = jwt.sign({ email: userExists.email, role: userExists.role }, process.env.JWT_KEY);
      var userName = userExists.name;
      var userEmail = userExists.email;

      res.status(200).send({
        token: tokengenerated,
        name: userName,
        email: userEmail
      });
  	}else {
      res.status(406).send({
  		Messagem: "Password incorrect"
  	})
    }
  }else{
  	res.status(404).send({
  		Messagem: "Not found"
  	})
  }

}

module.exports = Login;
