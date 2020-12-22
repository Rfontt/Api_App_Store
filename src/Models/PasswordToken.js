const database = require('../Database/database');
const { v4 } = require('uuid');

const PasswordToken = {
  async findByEmail(email){
    try {
      var result = await database.select("*").where({ email: email }).table("Users");
      if (result.length > 0) {
        return result[0];
      }else {
        return undefined;
      }
    } catch (e) {
        return undefined;
    }
  },

    async create(email) {
      var user = await this.findByEmail(email);
      if (user != undefined) {
        try {
          var tokengenerate = v4();
          await database.insert({
            id_user: user.id,
            used: 0,
            token: tokengenerate
          }).table("Password");
            return { status: true, token: tokengenerate };
        } catch (error) {
            return { status: false, error: error };
        }
      }
      return undefined;
    },
    async validate(token){
        try {
          var result = await database.select("*").where({ token: token }).table("Password");
          if (result.length > 0) {
            var resultToken = result[0];
            if (resultToken.used) {
              return { status: false };
            }else {
              return { status: true, token: resultToken };
            }
          }else{
            return false;
          }
        } catch (e) {
          return undefined;
        }
    },

    async setUsed(token){
      try {
        await database.update({ used: 1 }).where({ token }).table("Password");
        return true;
      } catch (e) {
        return undefined;
      }
    }
}

module.exports = PasswordToken;
