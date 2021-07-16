const productService = require('../services/products');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const postProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const result = await productService.addProduct(name, quantity);

    if(result.err) {
      const { status, ...rest } = result;
      return res.status(status).send(rest);
    }
    
    return res
      .status(HTTP_STATUS_CREATED)
      .send(result);
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

const getProducts = async (_req, res) => {
  try {
    const products = await productService.getAllProducts();
    return res
      .status(HTTP_STATUS_OK)
      .send(products);
    
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (product.err) {
      const { status, ...rest } = product;
      return res.status(status).send(rest);
    }

    return res
      .status(HTTP_STATUS_OK)
      .send(product);
    
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

const putProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const result = await productService.updateProduct(id, name, quantity);

    if(result.err) {
      const { status, ...rest } = result;
      return res.status(status).send(rest);
    }

    return res
      .status(HTTP_STATUS_OK)
      .send(result);    
  } catch (error) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    
    if (result.err) {
      const { status, ...rest } = result;
      return res.status(status).send(rest);
    }

    return res
      .status(HTTP_STATUS_OK)
      .send(result);
  } catch (err) {
    return res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
};

module.exports = {
  postProduct,
  getProducts,
  getProductById,
  putProduct,
  deleteProduct,
};
