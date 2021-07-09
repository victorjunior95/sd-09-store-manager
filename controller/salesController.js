const salesService = require('../service/salesService');

const registerSales = async (req, res) => {
  const sales = req.body;
  const { status, response } = await salesService.register(sales);

  res.status(status).json(response);
};

// const listProducts = async (req, res) => {
//   const { id } = req.params;
//   const { status, response } = await productsService.list(id);

//   res.status(status).json(response);
// };

// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   const { status, response } = await productsService.update(id, name, quantity);

//   res.status(status).json(response);
// };

// const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   const { status, response } = await productsService.remove(id);

//   res.status(status).json(response);
// };

module.exports = {
  registerSales,
  // listProducts,
  // updateProduct,
  // deleteProduct
};
