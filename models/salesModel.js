const connection = require('./connection');
const { ObjectId } = require('mongodb');
const productsModel = require('./productsModel');
const response = require('../middlewares/responseCodes');

const getAllSales = async () => {
  try {
    return connection()
      .then((db) => db.collection('sales').find().toArray());
  } catch (error) {
    return {
      error: error.status,
      message: error.message,
    };
  }
};

const getSaleById = async (id) => {
  try {
    const foundSale = await connection()
      .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
    if(foundSale === null) throw new Error();
    return foundSale;
  } catch (error) {
    const errorObj = {
      err: {
        code:'not_found',
        message: 'Sale not found'
      }
    };
    return errorObj;
  }
};

// const returnToStock = async (sale) => {
//   sale.itensSold.forEach(async (eachSale) => {
//     const productSold = await productsModel.getProductById(eachSale.productId);
//     const { name, quantity, id } = productSold;
//     await productsModel.updateProduct(name, quantity - eachSale.quantity, id);
//   });
// };

// const removeFromStock = async (sale) => {
//   sale.itensSold.forEach(async (eachSale) => {
//     const productSold = await productsModel.getProductById(eachSale.productId);
//     const { name, quantity, id } = productSold;
//     await productsModel.updateProduct(name, quantity + eachSale.quantity, id);
//   });
// };

const createNewSale = async (sales) => {
  try {
    const newSale = await connection()
      .then((db) => db.collection('sales').insertOne({ itensSold: sales }));
    // await removeFromStock(newSale.ops[0]);
    return newSale.ops[0];
  } catch (error) {
    const errorObj = {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      },
    };
    return errorObj;
  };
};

const deleteSale = async (id) => {
  try {
    const deletedSale = await getSaleById(id);
    await connection().then((db) => db.collection('sales').deleteOne(
      { _id: ObjectId(id)}
    ));
    if(deletedSale === null) throw new Error();
    // await returnToStock(newSale.ops[0]);
    return deletedSale;
  } catch (error) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: 'Wrong id format'
      }
    };
    return errorObj;
  }
};

const updateSale = async (sale, id) => {
  try {
    const updatedSale = await connection()
      .then((db) => db.collection('sales').updateOne(
        { _id: ObjectId(id)},
        { $set : { 'itensSold': sale } },
      ));
    // await updateStock(newSale.ops[0]);
    return getSaleById(id);
  } catch (error) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: 'Wrong id format'
      }
    };
    return errorObj;
  }
};

module.exports = {
  getAllSales,
  getSaleById,  
  createNewSale,
  deleteSale,
  updateSale,
};
