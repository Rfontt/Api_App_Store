const database = require('../Database/database');
const bcrypt = require('bcrypt');
const PasswordToken = require('./PasswordToken');

const UserAdm = {
    async newUserAdm(name, email, password){
      if (name != undefined && email != undefined && password != undefined) {
        try {
          var hash = await bcrypt.hash(password, 10);
          await database.insert({ name, email, password: hash, role: 1 }).table("Users");
          return true;
        } catch (e) {
          return undefined;
        }
      }
      return undefined;
    },

    async findAllUsers(){
      try{
        var result = await database.select("id", "email", "name").table("Users");
        return result;
      }catch(e){
        return undefined;
      }
    },

    async findByEmail(email){
      if (email != undefined) {
        try {
          var result = await database.select("*").where({ email: email }).table("Users");
          if (result.length > 0) {
            return result[0];
          }
        } catch (e) {
          return undefined;
        }
      }
      return undefined;
    },

    async findById(id){
      if (id != undefined) {
        try {
          var result = await database.select("name", "email").table("Users").where({ id: id });
          return result[0];
        } catch (e) {
          return undefined;
        }
      }
      return undefined;
    },

    async updateNameAndEmailUser(id, name, email) {
      var idUser = await this.findById(id);

      if (idUser != undefined) {
        if (email != undefined && name != undefined) {
          if (email != idUser.email || name != idUser.name) {
            try {
              await database.update({ name, email }).table("Users").where({ id: id });
              return true;
            } catch (e) {
              return false;
            }
          }
          return undefined;
        }
        return undefined;
      }
      return undefined;
    },

    async updatePassword(id, password, token){
      var idUser = await this.findById(id);

      if (idUser != undefined) {
        if (password != undefined || token != undefined) {
          try {
            var hash = await bcrypt.hash(password, 10);
            await database.update({ password: hash }).where({ id: id }).table("Users");
            await PasswordToken.setUsed(token);
            return true;
          } catch (e) {
            return false;
          }
        }
        return undefined;
      }
      return undefined;
    },

    async deleteUser(id){
      var idUser = await this.findById(id);

      if (idUser != undefined) {
        try{
          await database.delete().table("Users").where({ id: id });
          return true;
        }catch(e){
           return undefined;
        }
      }

      return undefined;
    }
}

module.exports = UserAdm;
