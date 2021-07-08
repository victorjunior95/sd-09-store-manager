const ModelSales = require('../model/ModelSales');

const create = async (itensSold) => {

  const createItensSold = await ModelSales.create(itensSold);

  return createItensSold;
};

const getAllOrById = async (id) => {

  if (!id) {
    const findAllSales = await ModelSales.getAll();

    return findAllSales;
  }

  const findSaleById = await ModelSales.getById(id);

  if (!findSaleById) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return findSaleById;
};

module.exports = {
  create,
  getAllOrById,
};
