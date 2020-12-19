const database = require('../Database/database');

const Purchases = {
  async createPurchase(purchase, pricePurchase, pieceQuantity, payment, installment, valueToSell){
    if (purchase != undefined && pricePurchase != undefined && pieceQuantity != undefined &&
        payment != undefined && installment != undefined && valueToSell != undefined) {
        try {
          var profitResult = (valueToSell *  pieceQuantity) - pricePurchase;
          await database.insert({ purchase, pricePurchase, pieceQuantity,
          payment, installment, valueToSell, profit: profitResult }).table("Purchases");
          return true;
        } catch (e) {
          return undefined;
        }
    }
    return undefined;
  },

  async findByAllPurchases(){
    try {
      var result = await database.select("*").table("Purchases").orderBy("id", "desc");
      return result;
    } catch (e) {
      return undefined;
    }
  },

  async findByIdPurchase(id){
    if (id != undefined) {
      try {
        var result = await database.select("*").table("Purchases").where({ id: id });
        return result[0];
      } catch (e) {
        return undefined;
      }
    }
    return undefined
  },


  async updatePurchases(id, purchase, pricePurchase, pieceQuantity, payment, installment, valueToSell){
    var idPurchase = await this.findByIdPurchase(id);

    if (idPurchase != undefined) {
      if (purchase != undefined && pricePurchase != undefined && pieceQuantity != undefined &&
          payment != undefined && installment != undefined && valueToSell != undefined) {
        try {
          var profitResult = (valueToSell *  pieceQuantity) - pricePurchase;
          await database.update({ purchase, pricePurchase, pieceQuantity,
          payment, installment, valueToSell, profit: profitResult }).table("Purchases").where({ id: id });
          return true;
        } catch (e) {
          return console.log(e);
        }
      }
      return undefined;
    }
    return undefined;
  },

  async deletePurchase(id){
    var idPurchase = await this.findByIdPurchase(id);

    if (idPurchase != undefined) {
      try {
        await database.delete().table("Purchases").where({ id: id });
        return true;
      } catch (e) {
        return false;
      }
    }
    return undefined;
  }
}

module.exports = Purchases;
