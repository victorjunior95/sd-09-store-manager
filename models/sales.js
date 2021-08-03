const connection = require('./connection');
const { ObjectId, ObjectID } = require('mongodb');

const create = async (sale) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold: sale });
  return result.ops[0];
};

const getAllSales = async() => {
  const db = await connection();
  const result = db.collection('sales').find().toArray();
  return result;
};

const getIdSales = async (_id) => {
  if(!ObjectId.isValid(_id)) return null;
  const db = await connection();
  const findByIdSales = db.collection('sales').findOne(ObjectId(_id));
  return findByIdSales;
};

const editSale = async(_id, sale) => {
  if(!ObjectId.isValid(_id)) return null;
  const db = await connection();
  const edite = db.collection('sales').updateMany(
    {
      _id: ObjectId(_id)},
    { $set: { itensSold: sale }},
  );
  return { _id, itensSold:sale };
};


const deleteSale = async(_id) =>{
  const db = await connection();
  const deleteSale = db.collection('sales').deleteOne(
    {
      _id: ObjectId(_id)
    }, 
  );
  return deleteSale;
};

const updateStock = async (id, quantity) => {
  if (quantity) {
    await connection()
      .then((db) => {
        db.collection('products')
          .updateOne({ _id: ObjectId(id) }, { $inc: { quantity } });
      });
  }
};

module.exports = { create, getAllSales, getIdSales, 
  editSale, 
  deleteSale, 
  updateStock, 
};
