const express = require('express');
const PasswordToken = require('../../Models/PasswordToken');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function TokenRecoverPassword(req, res) {
  var email = req.body.email;

  if (email == undefined) {
    res.status(400).send({
      Message: "Email is undefined"
    })
  }

  var result = await PasswordToken.create(email);
  
  if (result.status) {
    try {
      const transport =  await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "587",
        auth: {
          user: process.env.USER_NODEMAILER,
          pass: process.env.PASS_NODEMAILER
      }

      })

      await transport.sendMail({
        from: process.env.From_User,
        to: email,
        subject: "Token generated",
        html: result.token + "<br /> <h3>Esse é o token para a recuperação da sua senha</h3>"
      })

      res.send({
        Message: "Token generated"
      });
    }catch(e) {
      res.status(500).send({
        Message: "Error "
      })
    }
  }else{
    res.status(406).send({
      Message: "Token not Generated"
    })
  }
}

module.exports = TokenRecoverPassword;
