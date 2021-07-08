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

const editSale = async (id, itensSold) => {
  const editedSale = await ModelSales.editSale(id, itensSold);

  return editedSale;
};

const deleteSale = async (id) => {

  const findForDeleteSaleById = await ModelSales.getById(id);

  if (!findForDeleteSaleById) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  const deletedSale = await ModelSales.deleteSale(id);

  return deletedSale;
};

module.exports = {
  create,
  getAllOrById,
  editSale,
  deleteSale,
};
