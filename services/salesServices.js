const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const { messageErrorsSales: messageErr } = require('../helpers/messagesErros');
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

// getAll
const getAll = async () => ({ sales: await salesModel.getAll() });

// getById
const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw (generateMessage(messageErr.saleNotFound));
  console.log(id);
  const sale = await salesModel.getById(id);
  return sale;
};

module.exports = {
  add,
  getAll,
  getById,
};
