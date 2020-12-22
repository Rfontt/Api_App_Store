const express = require('express');
const users = express.Router();
const Authorization = require('../Middleware/UserAdm');

const FindAllUsersController = require('../Controllers/Users_Adm/FindAllUsers');
const CreateUsersAdmController = require('../Controllers/Users_Adm/CreateUser');
const LoginController = require('../Controllers/Users_Adm/Login');
const UpdateNameAndEmailUserController = require('../Controllers/Users_Adm/UpdateNameAndEmail');
const TokenPasswordController = require('../Controllers/Users_Adm/TokenPassword');
const UpdatePasswordController = require('../Controllers/Users_Adm/UpdatePassword');
const DeleteUserController = require('../Controllers/Users_Adm/DeleteUser');


users.get("/user", Authorization, FindAllUsersController);
users.post("/user", CreateUsersAdmController);
users.post("/login", LoginController);
users.post("/token", TokenPasswordController);
users.put("/user/:id", Authorization, UpdateNameAndEmailUserController);
users.patch("/password", UpdatePasswordController);
users.delete("/user/:id", Authorization, DeleteUserController);



module.exports = users;
