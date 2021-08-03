const Model = require('../models');

const ERROR_CODE_400 = 'invalid_data';
const ERROR_SALES = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong product ID or invalid quantity',
} };

const quantityTypeValidator = (quantity) => typeof(quantity) === 'number';

const quantityValidator = (quantity) => quantity >= 1;

const addSales = async (salesData) => {
  let error = false;

  const sales = salesData.map(({ productId, quantity }) => ({ productId, quantity }));

  await sales.forEach(async ({ productId, quantity }) => {
    const test = await Model.products.getProductById(productId);

    if(!test) error = true;

    if (!quantityTypeValidator(quantity)) error = true;

    if (!quantityValidator(quantity)) error = true;
  });

  if (error) return ERROR_SALES;

  return await Model.sales.addSales(salesData);
};

const getSales = async () => await Model.sales.getSales();

module.exports = {
  addSales,
  getSales,
};
