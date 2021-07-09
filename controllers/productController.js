const productService = require('../services/productService');
const CREATED = 201;
const OK = 200;
const UNPROCESSABLE = 422;

const productCreate =  async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.createNewProduct(name, quantity);
  if (newProduct.err) {
    return res.status(UNPROCESSABLE).json(newProduct);
  }
  return res.status(CREATED).json(newProduct);
};

const listAllProducts = async (req, res) => {
  const allProducts = await productService.listAllProduct();
  return res.status(OK).json(allProducts);
};


const listProductId = async (req, res) => {
  const { id } = req.params;

  const getIdProduct = await productService.listProductById(id);
  if (getIdProduct.err) {
    return res.status(UNPROCESSABLE).json(getIdProduct);
  }

  return res.status(OK).json(getIdProduct);
};

module.exports = {
  productCreate,
  listAllProducts,
  listProductId
};