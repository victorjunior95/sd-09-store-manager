const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const { messageErrorsSales: messageErr,
  messageErrorsProducts } = require('../helpers/messagesErros');
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

  const sale = await salesModel.getById(id);

  if (!sale) throw (generateMessage(messageErr.saleNotFound));
  return sale;
};

// update
const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) throw (generateMessage(messageErr.saleNotFound));

  const errorQuantity = findErrorQuantite(itensSold);

  if (errorQuantity.length) throw (errorQuantity.find(err => err !== undefined));

  return (await salesModel.update(id, itensSold));
};

//DELETE
const exclude = async (id) => {
  if (!ObjectId.isValid(id)) throw (generateMessage(messageErr.idFormatInvalid));

  return (await salesModel.exclude(id));
};


module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude,
};
