const productModel = require('../Models/functions');
const util = require('../utils');
const joi = require('@hapi/joi');
const num = 0;
const status = 422;
const mim = 5;
const validetionId = /[0-9a-z]{24}/;

const validetionProduction = joi.object({
  name: joi.string().min(mim),
  quantity: joi.number().integer().min(1),
});

async function create(name, quantity) {
  const { error } = validetionProduction.validate({ name, quantity });
  const retorneName = await productModel.findProductName(name);

  if (error) {
    const { message } = error.details[0];
    throw  util(status, 'invalid_data', message);
  }

  if(retorneName.length > num) throw util(
    status, 'invalid_data', 'Product already exists'
  );

  const retorneCreate = await productModel.create(name, quantity);
  return retorneCreate.ops[0];
}

const FindAll = async () => {
  const retorneFind = await productModel.findProductAll();

  return retorneFind;
};

const FindId = async (id) => {
  if(!validetionId.test(id)) throw util(status, 'invalid_data', 'Wrong id format');

  const retorneFind = await productModel.findProductId(id);
  if(!retorneFind) throw util(status, 'invalid_data', 'wrong id format');

  return retorneFind;
};

const upidate = async (id, name, quantity) => {
  //if(!validetionId.test(id)) throw util(status, 'invalid_data', 'Wrong id format');
  const { error } = validetionProduction.validate({ name, quantity });


  if (error) {
    const { message } = error.details[0];
    throw  util(status, 'invalid_data', message);
  }

  const retorneUpdate = await productModel.updateProduct(id, name, quantity);

  return retorneUpdate;
};

const deleteProduct = async (id) => {
  if(!validetionId.test(id)) throw util(status, 'invalid_data', 'Wrong id format');

  const retorneFind = await productModel.findProductId(id);
  if(!retorneFind) throw util(status, 'invalid_data', 'wrong id format');

  const retorne = await productModel.deleteProduct(id);

  return retorne;
};


module.exports = {
  create,
  FindAll,
  FindId,
  upidate,
  deleteProduct,
};
