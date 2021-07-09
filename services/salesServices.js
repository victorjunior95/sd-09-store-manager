const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const { messageErrorsSales: messageErr } = require('../helpers/messagesErros');
const { generateMessage, validateQuantitySales } = require('../helpers/funcValidate');

const findErrorQuantite = (itensSold) => {
  return itensSold.reduce((acc, crr) => {
    const responseValidate = validateQuantitySales(crr.quantity);
    if (responseValidate) {
      acc.push(responseValidate);
    }
    return acc;
  }, []);
};

const add = async (itensSold) => {
  const errorQuantity = findErrorQuantite(itensSold);

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

// update
const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) throw (generateMessage(messageErr.saleNotFound));

  const errorQuantity = findErrorQuantite(itensSold);

  if (errorQuantity.length) throw (errorQuantity.find(err => err !== undefined));

  return (await salesModel.update(id, itensSold));
};

module.exports = {
  add,
  getAll,
  getById,
  update,
};
