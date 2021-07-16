// const { findById } = require('../models/ProductsModel');
const {
  addNewSales,
} = require('../models/SalesModel');


// const getAllService = () => getAll();

// const findByIdService = async (id) => {
//   const product = await findById(id);

//   if (!product) throw new Error('Wrong product ID or invalid quantity');
//   return product;
// };

const addNewSalesService = async (allSales) => {
  // allSales.map((sale) => {
  //   if(sale.quantity < 1) {
  //     throw new Error('Wrong product ID or invalid quantity');
  //   }
  //   if(typeof sale.quantity === 'string') {
  //     throw new Error('Wrong product ID or invalid quantity');
  //   }
  // });
  allSales
    .filter((sale) =>{
      if (sale.quantity < 1 || typeof sale.quantity === 'string'){
        throw new Error('Wrong product ID or invalid quantity');
      }
    });
  const newSales = await addNewSales(allSales);
  return newSales;
};

module.exports = {
  addNewSalesService,
  // getAllService,
  // findByIdService
};
