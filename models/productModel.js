const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  connection().then((db) => db.collection('products').find().toArray());
};

module.exports = {
  getAll,
};

/* { "name": "Produto Silva", "quantity": 10 }
{ "_id": ObjectId("5f43cbf4c45ff5104986e81d"), "name": "Produto Silva", "quantity": 10 }
*/
