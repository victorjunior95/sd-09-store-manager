const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { getProductById, updateProduct } = require('./productModel');

const addSales = async (body) => {
  const { ops } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: body }));

  ops[0].itensSold.forEach(async (prod) => {
    const saleQuantity = prod.quantity;
    
    const { _id, name, quantity } = await getProductById(prod.productId);
    const newQuantity = quantity - saleQuantity;
    
    updateProduct(_id, name, newQuantity);
  });

  return ops[0];
};

const getSales = async () => {
  const result = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return result;
};

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
};

const updateSaleById = async (id, productId, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const result = await connection()
    .then((db) => {
      const saleId = new ObjectId(id);
      const newData = [{ productId, quantity}];
      return db.collection('sales').findOneAndUpdate(
        { '_id': saleId }, { $set: { itensSold: newData } }, { returnOriginal: false });
    }).then((result) => result.value);
  
  return result;
};

const deleteSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const sale = await getSalesById(id);
  
  const result = await connection()
    .then((db) =>  {
      const saleId = new ObjectId(id);
      db.collection('sales').deleteOne({ '_id': saleId });
    });

  sale.itensSold.forEach(async (prod) => {
    const saleQuantity = prod.quantity;
    
    const { _id, name, quantity } = await getProductById(prod.productId);
    const newQuantity = quantity + saleQuantity;
    
    updateProduct(_id, name, newQuantity);
  });

  return sale;
};



module.exports = {
  addSales,
  getSales,
  getSalesById,
  updateSaleById,
  deleteSaleById,
};
