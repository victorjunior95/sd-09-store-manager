const { nameProduct, productsId, getProducts } = require('../models/product');
const { getIdSales } = require('../models/sales');
const { ObjectID } = require('mongodb');
const { fakeServerWithClock } = require('sinon');
const { not } = require('joi');

const notProduct = 422; 
const notFound = 404;
const isValidName = (req, res, next) => {
  const { name } = req.body;
  const tamanhoName = 5;
  if(!name || typeof name !== 'string' || name.length < tamanhoName) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long',
      }
      }
    );
  }
  next();
};

const existName = async(req, res, next) => {
  const { name } = req.body;  
  if( await nameProduct(name)) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
      });
  }
  next();
};

const isValidQuantitPositivo = (req, res, next) =>{
  const { quantity } = req.body;
  if(parseInt(quantity) < 1 ) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
      });
  }
  next();
};

const isvalidQuantityIsNumber = (req, res, next) => {
  const { quantity } = req.body;
  if(!quantity || typeof quantity !== 'number') {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
      });
  }
  next();
};

const isValidId = async (req, res, next) => {
  const { _id } = req.params;
  if(!await productsId(_id)) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
      });
  }
  next();
};

const isValidSales = (req, res, next) =>{
  const minimumQuantity = 1;
  const { quantity } = req.body[0];
  
  if(quantity < minimumQuantity || typeof quantity !== 'number') {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
      });
  }
  next();
};

const isValidSaleId = async (req, res, next) => {
  const { _id } = req.params;
  if(!await getIdSales(_id)) {
    return res.status(notFound).json(
      { err: {
        code: 'not_found',
        message: 'Sale not found',
      }
      });
  }
  next();
};

const isValidNotId = async (req, res, next) => {
  const { _id } = req.params;
  if(!await getIdSales(_id)) {
    return res.status(notProduct).json(
      { err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
      });
  }
  next();
};

const stok = async(req, res, next) => {
  const { _id } = req.params;
  const sale = req.body;
  const arr = await getProducts();
  const available = sale.every(({ productId, quantity}) => {
    const stok = arr.find((e) => e._id.toString() === productId);
    return stok.quantity >= quantity;
  });
  if(!available) {
    return res.status(notFound).json(
      { err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      }
      });
  }
  next();
};

module.exports = { 
  isValidName, 
  existName, 
  isValidQuantitPositivo, 
  isvalidQuantityIsNumber,
  isValidId,
  isValidSales,
  isValidSaleId,
  isValidNotId,
  stok
};
