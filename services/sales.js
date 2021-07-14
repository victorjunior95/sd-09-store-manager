const sales = require('../models/sales');

const create = (itensSold) => {
  itensSold.forEach(({ productId, quantity }) =>
    sales.updateProducts(productId,-quantity));
  return sales.create(itensSold).then((data) => ({ status: 200, data }));
};

const getAll = () => sales.getAll().then((data) => ({ status: 200, data }));

const getById = (id) => sales.getById(id).then((data) => ({ status: 200, data }));

const update = (id, itensSold) => {
  itensSold.forEach(({ productId, quantity }) =>
    sales.updateProducts(productId, -quantity));
  return sales.update(id, itensSold).then((data) => ({ status: 200, data }));
};

const remove = (id) => {
  sales.getById(id).then(({ itensSold }) => itensSold.forEach(({ productId, quantity }) =>
    sales.updateProducts(productId, quantity)));
  return sales.remove(id).then((data) => ({ status: 200, data }));
};

module.exports = { create, getAll, getById, update, remove };
