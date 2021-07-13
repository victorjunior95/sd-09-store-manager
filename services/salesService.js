const sales = require('../models/sales');

const getAll = async () => {
  const salesList = await sales.getAll();
  return { sales: salesList };
};

const findById = async (id) => {
  const sale = await sales.findById(id);
  return sale;
};

const createSale = async (itensSold) => {
  const { insertedId } = await sales.create(itensSold);
  return { _id: insertedId, itensSold };
};

module.exports = {
  getAll,
  findById,
  createSale,
};
