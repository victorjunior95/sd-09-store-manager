const connection = require('./connections');
const { ObjectId } = require('mongodb');

const createSalesModel = async (salesData) => {
  return await connection()
    .then(db => db.collection('sales')
      .insertOne({ itensSold: salesData }))
    .then(result => result.ops[0]);
};

// const deleteProductModel = async (id) => {
//   return await connection()
//     .then(db => db.collection('products').deleteOne({ _id: ObjectId(id) }));
// };

module.exports = {
  createSalesModel,
};
