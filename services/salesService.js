const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const validateQuantity = (quantity) => {
  const invalidQuantity = 0;
  if (quantity <= invalidQuantity || Number.isNaN(parseInt(quantity, 10))) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    };
  }
};

//for (const item of array) foi a escolha por conta da assincronicidade
const createSale = async (order) => {
  for (const product of order) {
    const validateId = await productsModel.getProductById(ObjectId(product.productId));
    if (!validateId) {
      throw {
        status: 422,
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      };
    }
    await validateQuantity(product.quantity);
  }
  const newSale = await salesModel.createSale(order);
  return {
    status: 200,
    newSale,
  };
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return {
    status: 200,
    sales,
  };
};

const validateId = (id) => (ObjectId.isValid(id));

const getSaleById = async (id) => {
  if (!validateId(id)) {
    throw {
      status: 404,
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  }
  const sale = await salesModel.getSaleById(ObjectId(id));
  if (!sale) {
    throw {
      status: 404,
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  }
  return {
    status: 200,
    sale,
  };
};

const editSale = async (id, edit) => {
  const { productId, quantity } = edit[0];
  if (!validateId(productId)) {
    throw {
      status: 404,
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  }
  await validateQuantity(quantity);
  const editedSale = await salesModel.editSale(id, edit);
  return {
    status: 200,
    editedSale,
  };
};

const validateIfSaleExists = async (id) => {
  const saleExists = await salesModel.getSaleById(id);
  if (!saleExists) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    };
  }
  return saleExists;
};

const deleteSale = async (id) => {
  if (!validateId(id)) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    };
  }
  const deletedSale = validateIfSaleExists(id);
  const checkDelete = await salesModel.deleteSale(id);
  if (!checkDelete) {
    return {
      status: 200,
      deletedSale,
    };
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  editSale,
  deleteSale,
};
