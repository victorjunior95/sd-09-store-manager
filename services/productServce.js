const { ObjectId } = require('bson');
const { 
  getAll,
  insertProduct,
  deleteProduct,
  getbyname,
  getbyid,
  update, 
} = require('../models/productModel');

const invid = { 
  err:{
    code: 'invalid_data',
    message: 'Wrong id format'
  } 
}; 




const alldocs = async() => {
  const result = await getAll();
  return ({products: result});
};
  
const x = 10;
const f = 5;
const z = 0;
const delerr = { 
  err:{
    code: 'invalid_data',
    message: 'Wrong id format'
  } 
};

const insertpdt = async(name, quantity) => { 
  const count = await getbyname(name);
  
  if (name.length < f){
    
    return({ 
      err:{
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long'
      } 
    });
  }else if( quantity <= z){
    return (
      { 
        err:{
          code: 'invalid_data',
          message: '"\quantity\" must be larger than or equal to 1'
        } 
      }
    );

  } else if(!Number.isInteger(quantity)) {
    return (
      { 
        err:{
          code: 'invalid_data',
          message: '"\quantity\" must be a number'
        } 
      }
    );
  }else if(count > z) {
    return (
      { 
        err:{
          code: 'invalid_data',
          message: 'Product already exists'
        } 
      }
    );
  }else { return await insertProduct(name, quantity);};
  
};


const getoneid = async(id) => {
  if (!ObjectId.isValid(id)) {
    return(invid);
  }else { return await getbyid(id);}
};


const updateOne = async(id, body) => { 
  if( !body || body.name.length < f){
    return ({ 
      err:{
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long'
      } 
    });

  }else if( body.quantity <= z){
    return ({ 
      err:{
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      } 
    });
  }else if( typeof body.quantity === 'string'){
    return ({ 
      err:{
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      } 
    });
  }else { return await update(id, body);}
};


const deleteone = async(id) => {
  if (!ObjectId.isValid(id)) {
    return delerr;
  }else { 
    const result = await deleteProduct(id);
    return result;
  }

};


module.exports = {
  alldocs,
  insertpdt,
  deleteone,
  getoneid,
  updateOne,
};