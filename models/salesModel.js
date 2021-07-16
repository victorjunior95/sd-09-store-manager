const mongoConnection = require('../util/mongoConnection');
const ObjectId = require('mongodb').ObjectId;

const registerSale = async (sale) => {
  console.log(sale);
  const registeredSale = await mongoConnection().then(db => 
    db.collection('sales').insertOne((
      {'itensSold': sale}
    ))
  );
  return registeredSale.ops[0];
};

const getSales = async () => {
  const sales = await mongoConnection().then(db => 
    db.collection('sales').find().toArray()
  );
  return sales;
};

const getSaleById = async (id) => {
  if(!ObjectId.isValid(id)){return null;}
  const sale = await mongoConnection().then(db => 
    db.collection('sales').find(ObjectId(id)).toArray()
  );
  console.log(sale[0]);
  return sale[0];
};
module.exports = {
  registerSale,
  getSales,
  getSaleById
};
