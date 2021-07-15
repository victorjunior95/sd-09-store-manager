const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getNewSale = (newSale) => {
  const { _id, productId, quantity } = newSale;
  return { 
    _id, 
    productId,
    quantity,
  };
};

// const generateSale = async (products) => {
//   await connection()
//     .then((db) => db.collection('products').insertOne({itensSold: [...products]})
//       .then((result) => result.ops[0]));
// };

const generateSale = async (products) => {
  const db = await connection();
  const collection = await db.collection('sales');
  const insertSale = await collection.insertOne({itensSold: [...products]});
  return insertSale.ops[0];
};

const getAllSales = async () => {
  const db = await connection();
  const collection = await db.collection('sales');
  const saleList = await collection.find({}).toArray();
  console.log(saleList);
  return saleList;
};

const findOneSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const collection = db.collection('sales');
  const itensList = collection.findOne(new ObjectId(id));
  return itensList;
};

const editOneSale = async (id, itensSoldArray) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const collection = await db.collection('sales');
  // const updatedSale = await collection
  //   .findOneAndUpdate(
  //     {_id: ObjectId(id)},
  //     {$set: {itensSold: itensSoldArray}},
  //     {returnOriginal: false}
  //   );
  //   console.log(updatedSale);
  //   return updatedSale;
  await collection
    .updateOne({_id: ObjectId(id)}, {$set: {itensSold: itensSoldArray}});
  return {_id: id, itensSold: itensSoldArray };
};
const deleteSale = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  const db = await connection();
  const collection = await db.collection('sales');
  const deletedSale = await collection.findOneAndDelete({_id: ObjectId(id)});
  console.log(deletedSale.value);
  return deletedSale.value;
};

module.exports = {
  generateSale,
  getAllSales,
  findOneSale,
  editOneSale,
  deleteSale,
};