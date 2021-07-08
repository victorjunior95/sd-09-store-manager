const { validateNewProduct } = require('../service/productService');

const postProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await validateNewProduct(name, quantity);

  const unprocessable = 422;
  const created = 201;
  // deu ruim
  if(newProduct.err) return res.status(unprocessable).json(newProduct);
  // deu boa
  res.status(created).json(newProduct);
};

module.exports = { postProduct };

