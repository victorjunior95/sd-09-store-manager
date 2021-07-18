const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function save(itens) {
  const salesCollection = await connection('sales');
  const { ops } = await salesCollection.insertOne({ itensSold: itens });
  return ops[0];
}

async function findAll() {
  const salesCollection = await connection('sales');
  return salesCollection.find().toArray();
}

async function findById(id) {
  if (!ObjectId.isValid(id)) return;
  const salesCollection = await connection('sales');
  const sale = await salesCollection.findOne({ _id: new ObjectId(id) });
  return sale;
}

async function update({ id, productId, quantity }) {
  const salesCollection = await connection('sales');
  await salesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { 'itensSold.$[item].quantity': quantity } },
    { arrayFilters: [{ 'item.productId': new ObjectId(productId) }] },
  );
  return true;
}

module.exports = {
  save,
  findAll,
  findById,
  update,
};
