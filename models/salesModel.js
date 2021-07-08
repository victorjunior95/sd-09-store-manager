const { connection } = require('./connection');

const postOneSaleIntoDb = async (productId, quantity) => {
  const db = await connection();

  const sales = await db.collection('sales');

  const itensSold = [{
    productId,
    quantity,
  }];

  const newSale = await sales.insertOne({ itensSold });

  const sale = await newSale.ops[0];

  return newSale && sale;
};

const postManySalesIntoDb = async (salesArray) => {
  const db = await connection();

  const sales = await db.collection('sales');

  const itensSold = [
    ...salesArray,
  ];

  const newSale = await sales.insertOne({ itensSold });

  const sale = await newSale.ops[0];

  return newSale && sale;
};

module.exports = {
  postOneSaleIntoDb,
  postManySalesIntoDb,
};
