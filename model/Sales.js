const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const add = async (values) =>{  
  const newSale = await connect().then(async (db) => {
    const sale = await db.collection('sales').insertOne({});
    return sale.ops[0];
  });

  console.log(newSale);

  await connect().then(async (db) => {
    const updateWithItens = await db
      .collection('sales')
      .updateOne(
        {_id: ObjectId(newSale._id)},
        {
          $push: {
            'itensSold': {
              $each: values
            }
          }
        },        
        {upsert: true}
      );    
    return updateWithItens.ops;
  });  
  return newSale;
};

const getById = async (id)   => {  
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));  
};

const getAll = async ()   => 
  await connect().then(async (db) => {
    const product = await db.collection('sales').find().toArray();

    return product;
  });

const update = async (id, values) => 
  await connect().then(async (db) =>  {
    await db.collection('sales')
      .updateOne(        
        {_id: ObjectId(id)},
        {
          $push: {
            'itensSold': {
              $each: values
            }
          }
        },        );

    return { _id: id, itensSold: values};
  });  

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  return await connect().then(
    async (db) => await db.collection('sales').deleteOne({_id: ObjectId(id)})
  );  
};

module.exports = {
  add,
  getById,
  getAll,
  update,
  remove
};
