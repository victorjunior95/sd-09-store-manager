const { newProduct } = require('../models/productsModel');

const registerProduct = async (req, res) => {
  const { body } = req;
  const result = await newProduct(body);
  const { code, response } = result;
  return res.status(code).json(response);

}