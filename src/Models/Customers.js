const database = require('../Database/database');

const Customer = {
  async newCustomer(name, purchase, price, amount, date){
    try {
      var valueTotal = price * amount;
      await database.insert({ name, purchase, price, amount, total: valueTotal, date }).table("Customers");
      return true;
    } catch (e) {
      return false;
    }
  },

  async findByAllCustomers(){
    try {
      var result = await database.select("*").orderBy("id", "desc").table("Customers");
      return result;
    } catch (e) {
      return undefined;
    }
  },

  async findByIdCustomer(id){
    try{
      var result = await database.select("*").table("Customers").where({ id: id });
      if (result) {
        return result[0];
      }
       return undefined;
    }catch(e){
      return undefined;
    }
  },

  async updateCustomer(id, name, purchase, price, amount, date){
    var idCustomer = await this.findByIdCustomer(id);

    if (idCustomer != undefined) {
        if (name != undefined && purchase != undefined && price != undefined && amount != undefined &&  date != undefined) {
          try {
            var valueTotal = price * amount;
            await database.update({ name, purchase, price, amount, total: valueTotal, date }).where({ id: id }).table("Customers");
            return true;
          } catch (e) {
            return undefined;
          }
        }
        return undefined;
    }
      return undefined;
  },

  async deleteCustomer(id){
    var idCustomer = await this.findByIdCustomer(id);

    if (idCustomer != undefined) {
      try {
        await database.delete().table("Customers").where({ id: id });
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

}

module.exports = Customer;
