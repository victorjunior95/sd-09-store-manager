const modelSales = require('../models/sales');
const productModel = require('../models/product');;

const create = async(sale) => {

  const createSale = [];
  const zero = 0;
  for (let index = zero; index < sale.length; index++) {

    const result = await productModel.productsId(sale[index].productId);
    if(!result) return false;

    createSale.push(sale[index]);   
  }

  const saleSalva = await modelSales.create(createSale);
  return saleSalva;
};

const getAllSales = async() => {
  const sale = await modelSales.getAllSales();
  return sale;
};

const getSalesId = async(_id) => {
  const findId = await modelSales.getIdSales(_id);
  return findId;
};

const editSale = async (_id, sale) => {
  const editSale = await modelSales.editSale(_id, sale);
  return editSale;
};

const deleteSale = async(_id) => {
  const deleteSale = await modelSales.deleteSale(_id);
  return deleteSale;
};

module.exports = { create, getAllSales, getSalesId, editSale, deleteSale };
