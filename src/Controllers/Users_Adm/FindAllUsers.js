const express = require('express');
const Users = require('../../Models/UsersAdm');

async function FindAllUsers(req, res){
  var result = await Users.findAllUsers();
  if (result) {
    res.status(200).send({
      Users: result
    })
  }else{
    res.status(500).send({
      Message: "Error"
    })
  }

}

module.exports = FindAllUsers;
