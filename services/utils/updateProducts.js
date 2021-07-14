const findProduct = require('../../models/products/findProduct');
const updateProduct = require('../../models/products/updateProduct');
const { saleQuantity } = require('../utils/errorMessages');

const updateProducts = async (sale) => {
  console.log(sale);
  let response = '';
  const ZERO = 0;
  const { name, quantity, _id } = await findProduct(sale.productId);
  const qtt = quantity - sale.quantity;
  if(qtt < ZERO) {
    response = { code: 'stock_problem', message: saleQuantity };
  } else {
    const newProduct = { name, quantity: qtt };
    await updateProduct(_id, newProduct);
  }
  return response;
};

module.exports = updateProducts;
