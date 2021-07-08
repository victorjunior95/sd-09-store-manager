const salesModel = require('../models/salesModel');

const add = async (itensSold) => await salesModel.add(itensSold);

const getAll = async () => await salesModel.getAll()
  .then((sales) => ({ sales }));

const getById = async (id) => await salesModel.getById(id);

const update = async (productId, quantity) => (
  await salesModel.update(productId, quantity)
    .then(([sale]) => ({ ...sale, itensSold: [sale.itensSold] }))
);

module.exports = {
  add,
  getAll,
  getById,
  update
};
