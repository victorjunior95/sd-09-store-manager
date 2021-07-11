const SaleModel = require('../models/saleModel');
const ProductModel = require('../models/productModel');
const { ObjectId } = require('mongodb');

const MIN_QTY = 0;

const getAll = async () => {
  let sales = await SaleModel.getAll();
  return { sales };
};

const findById = async (id) => {
  let sale = await SaleModel.findById(id);

  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  };
  return sale;
};

const validateData = ({ productId, quantity }, listProducts ) => {
  if (quantity <= MIN_QTY) {
    return false;
  };

  if (typeof quantity !== 'number') {
    return false;
  };

  if (!listProducts.includes(productId)) {
    return false;
  };

  return true;
};

const create = async (sales) => {
  let listProducts = await ProductModel.getAll()
    .then((products) => products.map((item) => ObjectId(item['_id']).toString()));

  const result = sales.every((item) => validateData(item, listProducts));
  
  if (!result) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  };
  return SaleModel.create(sales);
};

const update = async (id, sale) => {
  
  let listProducts = await ProductModel.getAll()
    .then((products) => products.map((item) => ObjectId(item['_id']).toString()));

  const result = sale.every((item) => validateData(item, listProducts));
  console.log('update ' + result);
    
  if (!result) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    };
  };

  await SaleModel.update(id, sale);

  return { _id: id, itensSold: [...sale] };
};

const exclude = async (id) => {
  let sale = await SaleModel.exclude(id);

  if (!sale) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    };
  };

  return { _id: id };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};
