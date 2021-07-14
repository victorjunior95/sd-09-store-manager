const ProductsModel = require('../models/ProductsModel');
const SalesModel = require('../models/SalesModel');

const createErrorMsg = (status, message, code) => {
  const notFound = 404;  
  return ({
    status,
    result: {
      err: {
        code,
        message,
      },
    },
  });
};

const createErrorId = () => {
  const msg = 'Wrong product ID or invalid quantity';
  const code = 422;
  const error = createErrorMsg(code, msg, 'invalid_data');
  return error;
};

const createErrorQuantity = () => {
  const msg = 'Such amount is not permitted to sell';
  const code = 404;
  const error = createErrorMsg(code, msg, 'stock_problem');
  return error;
};

const validQuantity = (quantity) => {
  const minValidNumber = 0;
  if (quantity <= minValidNumber || typeof quantity !== 'number') return false;
  return true;
};

const addSale = async (arraySales) => {
  const zero = 0;
  try {
    for (let index = zero; index < arraySales.length; index += 1) {
      const currentProduct = await ProductsModel.find(arraySales[index].productId);
      console.log(currentProduct);
      if (!currentProduct) {
        const error =  createErrorId();
        return error;
      }
      if (!validQuantity(arraySales[index].quantity)) {
        const error = createErrorId();
        return error;
      }
      if (currentProduct.quantity < arraySales[index].quantity) {
        const error = createErrorQuantity();
        return error;
      }
      await ProductsModel.updateQuantity(arraySales[index].productId,
        arraySales[index].quantity);
    }
    const idSale = await SalesModel.create(arraySales);
    return({ status: 200, result: { _id: idSale, itensSold: arraySales } });
  } catch(e) {
    console.log(e.message, ' no catch');
  }
};

const list = async (id) => {
  try {
    if (id === undefined) {
      const sales = await SalesModel.find();
      return ({ status: 200, result: { sales: [...sales ] } });
    } else {
      const sales = await SalesModel.find(id);
      console.log(sales);
      if (!sales) throw new Error('Argument passed');
      return ({ status: 200, result: { ...sales } });
    }
  } catch(e) {
    console.log(e.message);
    console.log('to no catch');
    if (e.message.includes('Argument passed')) {
      const code = 404;
      msg = 'Sale not found';
      const error = createErrorMsg(code, msg, 'not_found');
      return error;
    }
  }
};

const updateSale = async (arraySales, id) => {
  const zero = 0;
  try {
    for (let index = zero; index < arraySales.length; index += 1) {
      const currentProduct = await ProductsModel.find(arraySales[index].productId);
      const currentSale = await SalesModel.find(id);
      console.log(currentSale);
      console.log(currentProduct);
      if (!currentProduct) {
        const error =  createErrorId();
        return error;
      }
      if (!validQuantity(arraySales[index].quantity)) {
        const error = createErrorId();
        return error;
      }
      if (currentProduct.quantity < arraySales[index].quantity) {
        const error = createErrorQuantity();
        return error;
      }
      await ProductsModel.updateQuantity(arraySales[index].productId,
        arraySales[index].quantity - currentSale.itensSold[index].quantity);
    }
    const result = await SalesModel.update(id, arraySales);
    console.log(result);
    return({ status: 200, result });
  } catch(e) {
    console.log(e.message);
    console.log('to no catch');
    if (e.message.includes('Argument passed')) {
      const code = 404;
      msg = 'Wrong product ID or invalid quantity';
      const error = createErrorMsg(code, msg, 'not_found');
      return error;
    }
  }
};

const deleteSale = async (id) => {
  const zero = 0;
  try {
    const sale = await SalesModel.find(id);
    await SalesModel.exlude(id);
    for (let index = zero; index < sale.itensSold.length; index += 1) {
      await ProductsModel.updateQuantity(sale.itensSold[index].productId,
        -sale.itensSold[index].quantity);  
    }

    return ({ status: 200, result: { ...sale } });
  } catch(e) {
    console.log(e.message);
    console.log('to no catch');
    if (e.message.includes('Argument passed')) {
      const code = 422;
      msg = 'Wrong sale ID format';
      const error = createErrorMsg(code, msg, 'invalid_data');
      return error;
    }
  }
};

module.exports = {
  addSale,
  list,
  updateSale,
  deleteSale,
};