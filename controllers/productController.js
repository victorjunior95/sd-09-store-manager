const productService = require('../services/productService');
const UNPROCESSABLE = 422;
const CREATED = 201;
const OK = 200;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.addProduct(name, quantity);

  if(newProduct.err){
    return res.status(UNPROCESSABLE).json(newProduct);
  }
  //console.log( newProduct.id, name, quantity );
  return res.status(CREATED)
    .json( newProduct);
};

const getProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  if (products.err) {
    return res.status(UNPROCESSABLE).json(products);
  };
  return res.status(OK).json({products});
};

const getProductById = async (req, res) => {
  const {id} = req.params;
  const product = await productService.getOneProductById(id);
  if (product.err) {
    return res.status(UNPROCESSABLE).json(product);
  };
  return res.status(OK).json(product);
};

const updateProduct = async (req, res) => {
  const {name, quantity} = req.body;
  const {id} = req.params;
  const product = await productService.updateOneProduct(id, name, quantity);
  if (product.err) {
    return res.status(UNPROCESSABLE).json(product);
  };
  return res.status(OK).json(product);
};

const deleteProduct = async (req, res) => {
  const {id} = req.params;
  const product = await productService.deleteOneProduct(id);
  if (product.err) {
    return res.status(UNPROCESSABLE).json(product);
  };
  return res.status(OK).json(product);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
