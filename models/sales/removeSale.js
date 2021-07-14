const { ObjectID } = require('mongodb');
const connection = require('../connect');


const removeSale = async (id) => {
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectID(id) });
  return '';
};

module.exports = removeSale;
