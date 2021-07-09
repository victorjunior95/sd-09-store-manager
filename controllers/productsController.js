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
  update,
} = require('../services/productServices');

const status200 = 200;
const status201 = 201;

const registerProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  try{
    await findByName(name);
    await checksLengthName(name);
    await checkQuantity(quantity);
    await checkIfQuantityIsANumber(quantity);
    const registeredProduct = await register(name, quantity);
    return res.status(status201).json(registeredProduct);
  }catch (error) {
    next(error);
  }
};

const getAllProducts = async (_req, res, _next) => {
  const allProducts = await getProducts();
  res.status(status200).json({ products: allProducts });
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try{
    await checkId(id);
    const product = await getSingleProduct(id);
    await checkIfProductExists(product);
    res.status(status200).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedProduct = await update( id, name, quantity);
    return res.status(status200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerProduct,
  getAllProducts,
  getProductById,
  updateProduct
};
