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
  const zero = 0;
  const isError = allSales
    .filter((sale) => (sale.quantity < 1 || typeof sale.quantity === 'string'));
  isError.forEach(array => {
    if(array.length !== zero ) throw new Error('Wrong product ID or invalid quantity');
  });
  await addNewSales(allSales);
  console.log(newSales);
  return newSales;
};

module.exports = {
  addNewSalesService,
  // getAllService,
  // findByIdService
};
