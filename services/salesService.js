const salesModel = require('../models/salesModel');

const add = async (itensSold) => await salesModel.add(itensSold);

const getAll = async () => await salesModel.getAll()
  .then((sales) => ({ sales }));

const getById = async (id) => await salesModel.getById(id);

const update = async (productId, quantity) => (
  await salesModel.update(productId, quantity)
    .then(([sale]) => ({ ...sale, itensSold: [sale.itensSold] }))
);

const remove = async (id) => await salesModel.remove(id);

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove
};
