const { nameProduct, productsId } = require('../models/product');

const notProduct = 422; 
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

module.exports = { 
  isValidName, 
  existName, 
  isValidQuantitPositivo, 
  isvalidQuantityIsNumber,
  isValidId 
};
