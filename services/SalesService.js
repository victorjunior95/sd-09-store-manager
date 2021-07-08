const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');

const productExists = async (id) => {
  const product = await ProductsModel.getById(id);

  if (product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    };
  }

  return true;
};

const isQuantityValid = (quantity) => {
  const ZERO = 0;

  if (quantity <= ZERO || typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    };
  }

  return true;
};

const create = async (productsList) => {
  const productValid = productExists(productsList[0].productId);
  const quantityValid = isQuantityValid(productsList[0].quantity);
  
  if (productValid.err) return productValid;
  if (quantityValid.err) return quantityValid;
  
  /* let id, qtd;
  
  productsList.forEach(async ({ productId, quantity }) => {
    id = await productExists(productId);
    qtd = isQuantityValid(quantity);
    
    if (id.err) return id;
    if (qtd.err) return qtd;
  }); */

  const newSale = await SalesModel.create(productsList); // Interação com o Model
  
  return newSale;
};

const getAll = async () => {
  const salesList = await SalesModel.getAll(); // Interação com o Model

  return salesList;
};

const getById = async (id) => {
  const sale = await SalesModel.getById(id);

  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  }

  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
};
