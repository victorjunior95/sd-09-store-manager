const sales = require('../models/sales');

const create = async (itensSold) => {
  itensSold.forEach(({ productId, quantity }) =>
    sales.updateProducts(productId,-quantity));
  return sales.create(itensSold).then((res) => res.ops[0]);
};

const getAll = async () => sales.getAll().then((res) => ({ 'sales': res }));

const getById = async (id) => sales.getById(id)
  .then((res) => res || { err: 'Sale not found' });

const update = async (id, itensSold) => {
  itensSold.forEach(({ productId, quantity }) =>
    sales.updateProducts(productId, -quantity));
  return sales.update(id, itensSold).then((res) => res);
};

const remove = async (id) => {
  const { itensSold } = await sales.getById(id);
  itensSold.forEach(({ productId, quantity }) =>
    sales.updateProducts(productId, quantity));
  return sales.remove(id).then((res) => res);
};

module.exports = { create, getAll, getById, update, remove };
