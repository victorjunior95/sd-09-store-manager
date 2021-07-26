const connection = require('./connection');
const { ObjectId } = require('mongodb');
const Products = require('./Products');

const createNewSale = async (sales) => {
  const { productId, quantity } = sales[0];
  const product = await Products.findById(productId);

  const currentQtd = product.quantity;
  const newQtd = currentQtd - quantity;
  const minQtd = 0;

  if (!product || newQtd < minQtd) return null;

  await Products.updateProduct(productId, product.name, newQtd);

  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => (result.ops[0])); 
};
  
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

const deleteSale = async (id) => {
  const saleToBeRemoved = await findById(id);
  if(!saleToBeRemoved) return null;
  const { productId, quantity } = saleToBeRemoved.itensSold[0];
  const { name, quantity: currentQtd } = await Products.findById(productId);
 
  const newQtd = currentQtd + quantity;;
  
  await Products.updateProduct(productId, name, newQtd);
  
  return connection()
    .then((db) => db.collection('sales')
      .findOneAndDelete({ _id: ObjectId(id)}))
    .then((result) => result.value)
    .catch(() => null);
};
 

module.exports = {
  createNewSale,
  getAll,
  findById,
  updateSale,
  deleteSale,
};