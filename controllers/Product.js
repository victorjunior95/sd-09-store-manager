const ProductService = require('../services/Product.js');

const STATUS_CREATED = 201;
const STATUS_OK = 200;
// const STATUS_INVALID = 400;
// const STATUS_NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const createProduct = async (req, res) => {
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

  if(product.name) return res.status(STATUS_CREATED).json(product);

};

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();
  res.status(STATUS_OK).json({products:products});
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const products = await ProductService.findByIdServices(id);
  if (products.err) return res.status(UNPROCESSABLE_ENTITY).json(products);

  res.status(STATUS_OK).json(products);
};

const editProducts = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await ProductService.update( id, name, quantity);
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
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const removedProduct = await ProductService.remove(id);
  if (removedProduct.err) return res.status(UNPROCESSABLE_ENTITY).json(removedProduct);

  return res.status(STATUS_OK).json(removedProduct);
};

module.exports = {
  createProduct,
  getAll,
  findProductById,
  editProducts,
  removeProduct,
};