const {
  register,
  findByName,
  checksLengthName,
  checkQuantity,
  checkIfQuantityIsANumber
} = require('../services/productServices');
const statusOK = 201;

const registerProduct = async (req, res, next) => {
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

module.exports = registerProduct;
