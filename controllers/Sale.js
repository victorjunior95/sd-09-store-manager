const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/Sale');
const Product = require('../services/Product');

const verifyStock = async () => {
  const noStock = {err: false};
  const products = await Product.getAll();
  console.log('products is: ' + products.products);
  const ZERO = 0;
  products.products.forEach((product) => {
    if (product.quantity < ZERO) {
      noStock.err = 
      { code: 'stock_problem', message: 'Such amount is not permitted to sell' };
    }
  });
  console.log(noStock.err);
  return noStock;
};

const create = rescue (async(req, res, next) => {
  const OK = 200;
  const soldProducts = req.body;
  const newSale = await service.create(soldProducts);
  const stock = await verifyStock();
  if (newSale.error) return next(newSale.error);
  if (stock.err) return next(stock.err);
  return res.status(OK).json(newSale);
});

const getAll = async (req, res) => {
  const OK = 200;
  const sales = await service.getAll();
  res.status(OK).json(sales);
};

const getOne = rescue (async (req, res, next) => {
  const OK = 200;
  const { id } = req.params;
  const sale = await service.findById(id);
  if (sale.error) return next(sale.error);
  return res.status(OK).json(sale);
});

const edit = rescue (async(req, res, next) => {
  const itens = req.body;
  const { id } = req.params;
  const OK = 200;
  const editedSale = await service.edit(id, itens);
  const stock = await verifyStock();
  if (editedSale.error) return next(editedSale.error);
  if (stock.err) return next(stock.err);
  return res.status(OK).json(editedSale);
});

const deleteOne = rescue (async (req, res, next) => {
  const OK = 200;
  const { id } = req.params;
  const stock = await verifyStock();
  const deleted = await service.deleteOne(id);
  if (deleted.error) return next(deleted.error);
  if (stock.err) return next(stock.err);
  return res.status(OK).json(deleted);
});

module.exports = { create, getAll, getOne, edit, deleteOne };
