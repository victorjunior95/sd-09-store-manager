const mongoConnection = require('../util/mongoConnection');

const registerSale = async (sale) => {
  const registeredSale = await mongoConnection().then(db => 
    db.collection('sales').insertOne((
      {'itensSold': sale}
    ))
  );
  return registeredSale[0];
};

module.exports = {
  registerSale
};
