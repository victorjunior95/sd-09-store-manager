const SalesModel = require('../models/SalesModel');

const addSale = async (body) => {

  const { insertedId } = await SalesModel.addSale(body);

  return {
    _id: insertedId,
    itensSold: body,
  };
};

module.exports = {
  addSale,
};
