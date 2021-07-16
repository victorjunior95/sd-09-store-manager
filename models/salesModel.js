const mongoConnection = require('../util/mongoConnection');

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

module.exports = {
  registerSale,
  getSales
};
