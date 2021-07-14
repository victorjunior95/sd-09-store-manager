const { ObjectID } = require('mongodb');
const connection = require('../connect');

const updateSale = async (id, sale) => {
  const db = await connection();
  const result = await db.collection('sales').updateOne(
    { _id: ObjectID(id) },
    { 
      $set: {
        itensSold: sale
      },
    },
  );
  return { _id: id, itensSold: sale };
};

module.exports = updateSale;