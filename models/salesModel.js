const connection = require('./connection');

const SALES = 'sales';

const createSales = async (sales) => {
  const db = await connection();
  return db.collection(SALES).insertOne({ itensSold: sales });
};

const getAllSales = async () => {
  const db = await connection();
  return db.collection(SALES).find().toArray();
};

const getSaleById = async (id) => {
  const db = await connection();
  return db.collection(SALES).findOne({ _id: id });
};

const updateSale = async (id, data) => {
  const db = await connection();
  const [{ productId, quantity }] = data;
  await db.collection(SALES).updateOne(
    { _id: id, },
    { $set: { 'itensSold.$[element].quantity': quantity } },
    { arrayFilters: [{ 'element.productId': productId }] },
  );
  return getSaleById(id);
};

const deleteSale = async (id) => {
  const db = await connection();
  const deletedSale = await getSaleById(id);
  db.collection(SALES).deleteOne({ _id: id });
  return deletedSale;
};

module.exports = {
  createSales,
  deleteSale,
  getAllSales,
  getSaleById,
  updateSale,
};
