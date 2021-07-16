const sales = require('../models/sales');
const productStock = require('../models/products');
const STATUS_422 = 422;

const create = async (newSale) => {
  const ret = await sales.create(newSale);
  newSale.forEach(async (item) => {
    await productStock.subtractQuantity(item.productId, item.quantity);
  });
  return ret;
};

const del = async (id) => {
  const saleId = await sales.getById(id);
  if (saleId === null) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong sale ID format' },
      status: STATUS_422
    };
  } else {
    const delSale = await sales.del(id);
    saleId.itensSold.forEach(async (item) => {
      await productStock.sumQuantity(item.productId, item.quantity);
    });
    return saleId;
  }
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
