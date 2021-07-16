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

const checkIfTheQuantityIsValid = ({ quantity }) => {
  const minValue = 0;

  const isValid = quantity > minValue;
  const isNumber = (typeof quantity) !== 'string';

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

const findAll = async () => {
  return await salesModel.getAll();
};

const findById = async (id) => {
  try {
    const result = await salesModel.getById(id);

    if (result === null) {
      return { status: 404, code: 'not_found', message: 'Sale not found' };
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, updatedSales) => {

  console.log('service');
  console.log('updatedSales', updatedSales);

  const isValidQuantities = checkIfTheQuantityIsValid(updatedSales[0]);
  if (!isValidQuantities) {
    return {
      status: 422,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    };
  }

  try {
    await salesModel.updateSales(id, updatedSales[0]);
    return { _id: id, ...updatedSales[0] };
  } catch (error) {
    console.log({ Erro: error.message });
  }
};

const deleteById = async (id) => {
  try {
    const searchedSale = await salesModel.getById(id);

    console.log('searchedSale', searchedSale);

    if (searchedSale === null) {
      return { status: 422, code: 'invalid_data', message: 'Wrong sale ID format' };
    }

    // await salesModel.deleteById(id);
    const result = await salesModel.deleteById(id);
    console.log(result);

    return { _id: id, ...searchedSale };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteById,
};
