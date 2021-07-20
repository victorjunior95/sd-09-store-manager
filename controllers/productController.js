const {
  productCreate,
  listProducts,
  productDetails
} = require('../services/productService');
const rescue = require('express-rescue');

const errorHandler = (error) => {
  return {
    'err': {
      'code': error.code,
      'message': error.message,
    }
  };
};

const productInsert = rescue(async (req, res, _next) => {
  const productData = req.body;
  const CREATED_STATUS = 201;
  const result = await productCreate(productData);
  if (result.status) {
    const err = errorHandler(result);
    return res.status(result.status).json(err);
  }
  return res.status(CREATED_STATUS).json(result);
});

const productsList = rescue(async (_req, res, _next) => {
  const GET_PRODUCT_SUCCESS = 200;
  const GET_PRODUCT_ERROR = 422;
  const list = { products: await listProducts() };
  if (list.products.err) {
    return res.status(GET_PRODUCT_ERROR).json(list.products.err);
  }
  return res.status(GET_PRODUCT_SUCCESS).json(list);
});

const productDetail = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const GET_PRODUCT_SUCCESS = 200;
  const GET_PRODUCT_ERROR = 422;

  const product = await productDetails(id);
  console.log(product);
  if (product.err) {
    return res.status(GET_PRODUCT_ERROR).json(product);
  }

  return res.status(GET_PRODUCT_SUCCESS).json(product);
});
  
module.exports = {
  productInsert,
  productsList,
  productDetail,
};