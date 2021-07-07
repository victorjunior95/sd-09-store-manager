const ProductService = require('../Service/ProductService');

const { StatusCodes } = require('http-status-codes');

const createProduct = async (req, res) => {
  console.log('[PRODUCTS CONTROLLER] : CHAMOU O MÉTODO ADICIONAR UM PRODUCTS');
  try {
    const { name, quantity } = req.body;
    const result = await ProductService.createProduct(name, quantity);

    if (result.isError) return res.status(result.status).json(result);

    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.log(`[PRODUCTS CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
const getAllProducts = async (_req, res) => {
  console.log('[PRODUCTS CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS PRODUCTS');
  try {
    const result = await ProductService.getAllProducts();

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[PRODUCTS CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getOneProduct = async (req, res) => {
  console.log('[PRODUCTS CONTROLLER] : CHAMOU O MÉTODO BUSCAR UM PRODUCTO');
  try {
    const { id } = req.params;
    const result = await ProductService.getProductId(id);
    if (result.isError) return res.status(result.status).json(result);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[PRODUCTS CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  console.log('[PRODUCTS CONTROLLER] : CHAMOU O MÉTODO DELETAR UM PRODUCT');
  const { id } = req.params;
  try {
    const product = await ProductService.deleteProduct(id);
    if (product.isError) return res.status(product.status).json(product);
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.log(`[PRODUCTS CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  console.log('[PRODUCTS CONTROLLER] : CHAMOU O MÉTODO EDITAR UM PRODUCT');
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await ProductService.updateProduct(id, name, quantity);
    if (product.isError) return res.status(product.status).json(product);
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.log(`[PRODUCTS CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = { 
  createProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  updateProduct
};
