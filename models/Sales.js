const { ObjectId } = require('mongodb');
const connection = require('./connection');

function addNewSale(data) {
  return connection().then((db) =>
    db.collection('sales').insertMany(data))
	  .then(({ ops } ) => ops);
}

module.exports = {
  addNewSale,
};