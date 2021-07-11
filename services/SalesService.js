const {
  //getNewSales,
  createSales,
  getAllSales,
  getById,
  updateSales,
 // deleteSales,
} = require('../models/SalesModel');

const errors = {
  invalid: 'invalid_data',
  not_found: 'not_found',
  wrong_id: 'Wrong product ID or invalid quantity',
  invalid_sale: 'Sale not found',
};

const NOT_FOUND = 404;
const UNPROCESSABLE = 422;
const quantity_min = 1;

const validateQuantity = async (itemSold) => {
  const quantity = itemSold.quantity;
  if (quantity < quantity_min || typeof quantity === 'string') return {
    isError: true,
    err: {
      code: errors.invalid,
      message: errors.wrong_id,
    },
    status: UNPROCESSABLE,
  };
  return true;
};

const createService = async (itemSold) => {
  //console.log(itemSold);
  const isValid = await validateQuantity(itemSold);
  //console.log(isValid)
  if (isValid !== true) return isValid;

  const sales = await createSales(itemSold);
  //console.log(sales)
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
/*
const deleteService = async (id) => {
  const sale = await deleteSales(id);
  if (!sale) return {
    isError: true,
    err: {
      code: errors.invalid,
      message: errors.wrong_id,
    },
    status: UNPROCESSABLE,
  };

  return sale;
};
*/
module.exports = {
  createService,
  getAllService,
  getByIdService,
  updateService,
  //deleteService,
};