const sales = require('../models/sales');

const getAll = async () => {
  const salesList = await sales.getAll();
  return { sales: salesList };
};

const findById = async (saleId) => {
  const sale = await sales.findById(saleId);
  return sale;
};

const createSale = async (itensSold) => {
  const { insertedId } = await sales.create(itensSold);
  return { _id: insertedId, itensSold };
};

const updateSale = async (saleId, itemSold) => {
  const { itensSold } = await sales.findById(saleId);
  itensSold.forEach((item) => {
    if (item.productId === itemSold.productId) {
      item.quantity = itemSold.quantity;
    }
  });
  const { modifiedCount } = await sales.update(saleId, itensSold);
  if(modifiedCount) {
    return { _id: saleId, itensSold };
  }
  return {err: {code: 'bd_acess_error', message: 'Error trying update sale'}};
};

module.exports = {
  getAll,
  findById,
  createSale,
  updateSale
};
