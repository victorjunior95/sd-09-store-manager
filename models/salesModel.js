const { ObjectId } = require('mongodb');
const connection = require('./connection');
const collectionSales = 'sales';

const create = async (itensSold) => {

  const newSale = await connection().then((db) =>
    db.collection(collectionSales).insertOne({ itensSold }));

  return newSale.ops[0];
};

const listAll = async () => {
  const salesAll = await connection().then((db) =>
    db.collection(collectionSales).find({}).toArray());
  return salesAll;
};

const listSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const saleById = await connection().then((db) =>
    db.collection(collectionSales).findOne(new ObjectId(id)),
  );

  if (!saleById) return null;
  return saleById;
};

const update = async (id, itensSold) => {
  const saleId = new ObjectId(id);
  const updateSale = await connection().then((db) =>
    db.collection(collectionSales)
      .findOneAndUpdate(
        { _id: saleId },
        { $set: { itensSold } },
        { returnOriginal: false }),
  ).then((result) => result.value);
  return updateSale;
};

const exclude = async (id) => {
  const saleId = new ObjectId(id);
  const deleteSale = await connection().then((db) =>
    db
      .collection(collectionSales)
      .findOneAndDelete({ _id: saleId }, { project: { itensSold: 1 } }),
  );
  console.log(saleId);
  return deleteSale.value;
};

module.exports = { 
  create,
  listAll,
  listSaleById,
  update,
  exclude,
};