const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const { messageErrorsProducts: messageErr } = require('../helpers/messagesErros');
const { generateMessage, validateQuantitySales } = require('../helpers/funcValidate');

const add = async (itensSold) => {
  const errorQuantity = itensSold.reduce((acc, crr) => {
    const responseValidate = validateQuantitySales(crr.quantity);
    if (responseValidate) {
      acc.push(responseValidate);
    }
    return acc;
  }, []);

  if (errorQuantity.length) throw (errorQuantity.find(err => err !== undefined));

  return (await salesModel.add(itensSold));
};

module.exports = {
  add,
};
