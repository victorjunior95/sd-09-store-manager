const {
  createSales,
  getAllSales,
  getById,
  updateSales,
  deleteSales,
} = require('../models/SalesModel');

const errors = {
  invalid: 'invalid_data',
  not_found: 'not_found',
  wrong_id: 'Wrong product ID or invalid quantity',
  invalid_sale: 'Sale not found',
  wrong_sale_id: 'Wrong sale ID format',
};

const NOT_FOUND = 404;
const UNPROCESSABLE = 422;
const quantity_min = 1;
const first_index = 0;

const validateQuantity = async (itemSold) => {
  for (let index = first_index; index < itemSold.length; index++) {
    const quantity = itemSold[index].quantity;
    if (quantity < quantity_min || typeof quantity === 'string') return {
      isError: true,
      err: {
        code: errors.invalid,
        message: errors.wrong_id,
      },
      status: UNPROCESSABLE,
    };
  }
  return true;
};

const createService = async (itemSold) => {
  const isValid = await validateQuantity(itemSold);
  if (isValid !== true) return isValid;

  const sales = await createSales(itemSold);
  return sales;
};

const updateService = async (id, requestedSales) => {
  const isValid = await validateQuantity(requestedSales);
  if (isValid !== true) return isValid;

  const editedSales = await updateSales(id, requestedSales);
  return editedSales;
};

const getAllService = async () => {
  const sales = await getAllSales();
  return sales;
};

const getByIdService = async (id) => {
  const sales = await getById(id);
  if (!sales) return {
    isError: true,
    err: {
      code: errors.not_found,
      message: errors.invalid_sale,
    },
    status: NOT_FOUND,
  };

  return sales;
};

const deleteService = async (id) => {
  const sale = await deleteSales(id);
  if (!sale) return {
    isError: true,
    err: {
      code: errors.invalid,
      message: errors.wrong_sale_id,
    },
    status: UNPROCESSABLE,
  };

  return sale;
};

module.exports = {
  createService,
  getAllService,
  getByIdService,
  updateService,
  deleteService,
};