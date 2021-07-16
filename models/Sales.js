// Req 5 => Query com o mongodb
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const register = async(itensSold) => {
  // query para inserir um dado no mongodb
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  const registerSale = { _id: insertedId, itensSold };
  return registerSale;
};
// Req 6 => mostra todas as vendas
const findAll = async () => {
  const soldProducts = await connection()
    .then((db) => db.collection('sales').find().toArray()); // necessário converter para array
  return soldProducts;
};
// Req 6 => query para encontrar um produto
const findById = async (id) => {
  const soldProductById = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return soldProductById;
};
// Req 7 => query para atualizar venda
const updateById = async (id, itensSold) => {
  const updateSale = await connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
  return updateSale;
};
// Req 8 => query para fazer o delete do crud
const deleteById = async (id) => {
  const deleteSale = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return deleteSale;
};

module.exports = {
  register,
  findAll,
  findById,
  updateById, 
  deleteById
};
