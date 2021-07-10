const ModelSales = require('../model/ModelSales');
const ModelProducts = require('../model/ModelProducts');
const invalidData = require('../utils/errosFunctions');

const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;

const create = async (itensSold) => {
  await ModelProducts.decrementProductFromStock(itensSold);
  
  const createItensSold = await ModelSales.create(itensSold);

  return createItensSold;
};

const getAllOrById = async (id) => {

  if (!id) {
    const findAllSales = await ModelSales.getAll();

    return findAllSales;
  }

  const findSaleById = await ModelSales.getById(id);

  if (!findSaleById) throw invalidData
  ('not_found', 'Sale not found', NOT_FOUND);
  
  return findSaleById;
};

const editSale = async (id, itensSold) => {
  const editedSale = await ModelSales.editSale(id, itensSold);

  return editedSale;
};

const deleteSale = async (id) => {

  const findForDeleteSaleById = await ModelSales.getById(id);

  if (!findForDeleteSaleById) throw invalidData
  ('invalid_data', 'Wrong sale ID format', UNPROCESSABLE_ENTITY);

  await ModelProducts.incrementProductFromStock(findForDeleteSaleById.itensSold);

  const deletedSale = await ModelSales.deleteSale(id);

  return deletedSale;
};

module.exports = {
  create,
  getAllOrById,
  editSale,
  deleteSale,
};
