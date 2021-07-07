const { ObjectId } = require('mongodb');
const conn = require('./conn');

const getAll = async() => { 
  
  const products = await conn().then( db => db.collection('products').find().toArray());
  //console.log(products);
  return products;
      
    
};  




const getbyname = async(name) => {
  return await conn().then(db => db.collection('products').countDocuments({name}));
  
};

const getbyid = async(id) => {
  return conn().then(db => db.collection('products').findOne(ObjectId(id)));
  
};



const insertProduct = async(name, quantity) => {
  return  conn().then(
    async (db) => 
    {
      return await db.collection('products').insertOne({ name, quantity });
    }
  );
};

const update = async(id, body) => 
  conn().then( async (db) => { 
    const result = await db.collection('products').updateOne(
      {_id: ObjectId(id)}, {$set:{ name: body.name, quantity:body.quantity }});
    return (getbyid(id));
  });
;

const deleteProduct = async(id) => {
  
  return conn().then(
    async (db) => await db.collection('products').deleteOne({_id:ObjectId(id)})
  );
      
}; 

  




module.exports = {
  getAll,
  insertProduct,
  deleteProduct,
  getbyname,
  getbyid,
  update,
};