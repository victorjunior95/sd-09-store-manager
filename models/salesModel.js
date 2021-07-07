const { ObjectId } = require('mongodb');
const conn = require('./conn');
const {getbyid} = require('./productModel');
const rescue = require('rescue');
const z =0;




const allsale = async() => { 
  
  const sales = await conn().then( db => db.collection('sales').find().toArray());
  // console.log('model13', sales);
  return sales;
      
    
};  


const oneprodu = async(_id) => {
  return await conn().then(
    async(db) => { return await  db.collection('products').findOne(ObjectId(_id));}
  );
     
};

const getsaleby = async(id) => {
  const onSale = await conn().then(db => db.collection('sales').findOne(ObjectId(id)));
  return onSale;
  
};



const decrementpdt = async(arrvenda) => {
  
  
  //console.log('smodel42', arrvenda);
  for await (pdt of arrvenda){ 
    const produ = await oneprodu(pdt.productId);
    console.log('produ', produ);
    console.log('qtd', produ.quantity);
    const sbt = produ.quantity - pdt.quantity;

    conn().then(
      async (db) => {
        await db.collection('products').updateOne(
          {_id: ObjectId(pdt.productId)}, {$set: {quantity: sbt}}
        );
      }
    );
  }
};

const newsale =async(arrvenda)=>{
  const arr = arrvenda.map(({productId, quantity})=>{
    return {productId, quantity};  
  });
  return(
    conn().then( 
      async(db)=>{
        const inserted = await db.collection('sales').insertOne(
          {itensSold: arr}
        );
        //console.log('smodel67:', inserted.ops[0]);
        return(inserted.ops[0]);
      }
    )
  );
  
};


const updatesale = async(id, body) => 
  conn().then( async (db) => { 
    const result = await db.collection('sales').updateOne(
      {_id: ObjectId(id)}, {$set:{itensSold: body }});
    return await (getsaleby(id));
  });
;


const deletesale = async(id) => {
  return conn().then(
    async (db) => await db.collection('sales').deleteOne({_id:ObjectId(id)})
  );
}; 

const incrementpdt = async(arrvenda) => {
  //console.log('smodel42', arrvenda);
  const{ productId, quantity } = arrvenda[0];
  const produ = await oneprodu(productId);
  //console.log('smodel49', produ);
  const numberSuma = produ.quantity + quantity;
  conn().then(
    async (db) => {
      db.collection('products').updateOne(
        {_id: ObjectId(productId)}, {$set: {quantity: numberSuma}}
      );
    }
  ); 
};



module.exports = {
  allsale,
  newsale,
  deletesale,
  getsaleby,
  updatesale,
  decrementpdt,
  incrementpdt,
  oneprodu,
};