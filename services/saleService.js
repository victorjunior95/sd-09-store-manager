const SaleModel = require('../model/Sales');

const add = async (values) => {  
  const result = await SaleModel.add(values);
  
  return {
    _id: result._id,
    itensSold: values
  };
};

const listAll = async () => {
  const sales = await SaleModel.getAll();

  return { sales: sales};
};

const list = async (id) => {
  if(id){
    const sale = await SaleModel.getById(id);    

    return sale;
  }
  const allSales = await listAll();

  return allSales;
};

module.exports = {
  add,
  list
};
