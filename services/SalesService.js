const { findById } = require('../models/ProductsModel');
const { getAll } = require('../models/SalesModel');
const {
  addNewSales,
  updateSale,
} = require('../models/SalesModel');


const getAllService = () => getAll();

const findByIdService = async (id) => {
  const sale = await findById(id);

  if (!sale) return false;
  return sale;
};

const addNewSalesService = async (allSales) => {
  allSales
    .filter((sale) =>{
      if (sale.quantity < 1 || typeof sale.quantity === 'string'){
        console.log(sale.quantity);
        throw new Error('Wrong product ID or invalid quantity');
      }
    });
  const newSales = await addNewSales(allSales);
  return newSales;
};

const updateSaleService = async (id, quantity) => {

  if (quantity < 1) return false;

  if (typeof quantity === 'string') return false;

  return await updateSale(id, quantity);
};

module.exports = {
  addNewSalesService,
  getAllService,
  findByIdService,
  updateSaleService
};
