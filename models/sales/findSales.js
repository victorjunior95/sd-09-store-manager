const { ObjectID } = require('mongodb');
const connection = require('../connect');

const findSale = async (id) => {
  const db = await connection();
  try {
    const result = await db.collection('sales').findOne({ _id: ObjectID(id) });
    return result;
  } catch(error) {
    return null;
  }
};

module.exports = findSale;