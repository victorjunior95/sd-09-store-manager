const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createNewSale = async (sales) => 
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => (result.ops[0])); 

const getAll = async () => 
  connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((result) => ({ sales: result }));
  
 
const findById = async (id) =>
  connection()
    .then((db) => db.collection('sales'))
    .then((sales) => sales.findOne(ObjectId(id)))
    .catch(() => null);

const updateSale = async (id, sale) => 
  connection()
    .then((db) => db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } }))
    .then(() => ({ _id: id, itensSold: sale}));

const deleteSale = async (id) => 
  connection()
    .then((db) => db.collection('sales')
      .findOneAndDelete({ _id: ObjectId(id)}))
    .then((result) => result.value)
    .catch(() => null);


module.exports = {
  createNewSale,
  getAll,
  findById,
  updateSale,
  deleteSale,
};