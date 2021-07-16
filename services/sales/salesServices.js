const salesModel = require('../../models/sales/salesModel');

const checkIfTheProductsExist = async (products) => {
  return await Promise.all(
    products.map( async ({ productId }) => await salesModel.findProduct(productId))
  );
};

const checkIfTheQuantitiesIsValid = (products) => {
  const minValue = 0;

  const isValid = products.every(({ quantity }) => quantity > minValue );
  const isNumber = (typeof products.quantity) !== 'string';

  return isValid && isNumber;
};

const create = async (productsSold) => {
  const productsFound = await checkIfTheProductsExist(productsSold);
  const isValidProducts = await productsFound.some((product) => product === null);

  const isValidQuantities = checkIfTheQuantitiesIsValid(productsSold);

  if (isValidProducts || !isValidQuantities) {
    return {
      status: 422,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    };
  }

  // se todos os produtos exitem no banco de dados cadastrar a venda
  const createdSales = await salesModel.createSales(productsSold);

  return { createdSales, status: 200};
};

module.exports = {
  create,
};
