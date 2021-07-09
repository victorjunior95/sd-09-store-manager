const {
  register,
  findByName,
  checksLengthName,
  checkQuantity,
  checkIfQuantityIsANumber,
  getProducts,
  getSingleProduct,
  checkIfProductExists,
  checkId,
} = require('../services/productServices');

const registerProduct = async (req, res, next) => {
  const statusOK = 201;
  const { name, quantity } = req.body;
  try{
    await findByName(name);
    await checksLengthName(name);
    await checkQuantity(quantity);
    await checkIfQuantityIsANumber(quantity);
    const registeredProduct = await register(name, quantity);
    return res.status(statusOK).json(registeredProduct);
  }catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  const statusOK = 200;
  const allProducts = await getProducts();
  res.status(statusOK).json({ products: allProducts });
};

const getProductById = async (req, res, next) => {
  const statusOK = 200;
  const { id } = req.params;
  try{
    await checkId(id);
    const product = await getSingleProduct(id);
    await checkIfProductExists(product);
    res.status(statusOK).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerProduct,
  getAllProducts,
  getProductById
};
