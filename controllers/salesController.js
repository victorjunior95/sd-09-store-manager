const salesService = require('../services/salesService');
const productService = require('../services/productService');
const { ObjectId } = require('mongodb');

const STATUS_200_OK = 200;
const ERR_404 = 404;
const FIRST_INDEX = 0;
const MIN_QUANTITY = 0;

const create = async (req, res) => {
  const sales = req.body;
  const productsToUpdate = [];
  for (let index = FIRST_INDEX; index < sales.length; index += 1) {
    const { productId, quantity: soldQuantity } = sales[index];
    const productObjectId = ObjectId(productId);
    const { name, quantity } = await productService.getProductById(productObjectId);
    const newQuantity = quantity - soldQuantity;

    if (newQuantity < MIN_QUANTITY) {
      return res.status(ERR_404).json({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      });
    }

    productsToUpdate.push({ productObjectId, name, soldQuantity });
  }

  for (let index = FIRST_INDEX; index < productsToUpdate.length; index += 1) {
    const { productObjectId, name, soldQuantity } = productsToUpdate[index];
    const { quantity } = await productService.getProductById(productObjectId);
    await productService.updateProduct(productObjectId, name, quantity - soldQuantity);
  }

  const createdSales = await salesService.create(sales);
  return res.status(STATUS_200_OK).json(createdSales);
};

const getAllSales = async (_req, res) => {
  const allSales = await salesService.getAllSales();
  return res.status(STATUS_200_OK).json(allSales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (sale) {
    return res.status(STATUS_200_OK).json(sale);
  }
  return res.status(ERR_404).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  });
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedSale = await salesService.updateSale(id, data);
  return res.status(STATUS_200_OK).json(updatedSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const deletedSale = await salesService.deleteSale(id);
  const { itensSold } = deletedSale;

  for (let index = FIRST_INDEX; index < itensSold.length; index += 1) {
    const { productId, quantity: soldQuantity } = itensSold[index];
    const productObjectId = ObjectId(productId);
    const { name, quantity } = await productService.getProductById(productObjectId);
    await productService.updateProduct(productObjectId, name, quantity + soldQuantity);
  };

  return res.status(STATUS_200_OK).json(deletedSale);
};

module.exports = {
  create,
  deleteSale,
  getAllSales,
  getSaleById,
  updateSale,
};
