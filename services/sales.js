const sales = require('../models/sales');
const productStock = require('../models/products');

const create = async (newSale) => {
  const ret =  await sales.create(newSale);
  newSale.forEach(async (item) => {
    await productStock.subtractQuantity(item.productId, item.quantity);
  });
  return ret;
};

const del = async (id) => {
  const saleid = await sales.getById(id);
  const delSale = await sales.del(id);
  saleid.itensSold.forEach(async (item) => {
    await productStock.sumQuantity(item.productId, item.quantity);
  });
  return delSale;
};

const getAll = async () => sales.getAll();

const change = async (id, quantity) => {
  const product = await sales.change(id, quantity);
  return product;
};

const getById = async (id) => {
  const sale = await sales.getById(id);
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  del,
  change,
};
