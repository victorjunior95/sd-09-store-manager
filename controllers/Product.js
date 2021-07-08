const ProductService = require('../services/Product.js');

const STATUS_OK = 201;
const STATUS_INVALID = 400;
const STATUS_NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await ProductService.create(name, quantity);
  if(product.isValid) {
    const { message, code } = product.isValid.err;
    return(
      res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: code,
          message: message,
        }
      })
    );
  }

  if(product.err) {
    const { message, code } = product.err;
    return(
      res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: code,
          message: message,
        }
      })
    );
  }

  if(product.name) return res.status(STATUS_OK).json(product);
  
  res.status(STATUS_OK).json({message: 'tudo errado'});

};

module.exports = {
  createProduct,
};