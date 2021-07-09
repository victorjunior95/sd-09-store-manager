const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const productModel = require('../models/productsModel');
const { messageErrorsSales: messageErr } = require('../helpers/messagesErros');
const { generateMessage, validateQuantitySales } = require('../helpers/funcValidate');

const stockValidate = (quantity) => {

};

const updateProductSold = async (itensSold) => {
  const allProducts = await productModel.getAll();

  const productsUpdate = allProducts.filter(({ _id }) => {
    return itensSold.find(({ productId }) => productId === _id.toString());
  });

  productsUpdate.forEach(async ({ _id, name, quantity }, index) => {
    const subtraction = quantity - itensSold[index].quantity;
    await productModel
      .update(_id, name, subtraction);
  });
};

const updateProductsOfSaleDeleted = async (id) => {
  const allProducts = await productModel.getAll();

  const { itensSold } = await salesModel.getById(id);

  const productsUpdate = allProducts.filter(({ _id }) => {
    return itensSold.find(({ productId }) => productId === _id.toString());
  });

  productsUpdate.forEach(async ({ _id, name, quantity }, index) => {
    await productModel
      .update(_id, name, (quantity + itensSold[index].quantity));
  });
};

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

  await updateProductSold(itensSold);

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

  // await updateStock(itensSold);

  return (await salesModel.update(id, itensSold));
};

//DELETE
const exclude = async (id) => {
  if (!ObjectId.isValid(id)) throw (generateMessage(messageErr.idFormatInvalid));

  await updateProductsOfSaleDeleted(id);

  return (await salesModel.exclude(id));
};


module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude,
};
