const Ajv = require('ajv');

const productsSchema = require('./products.json');
// const salesSchema = require('./sales.json');

const ajv = new Ajv({allErrors: true});
require('ajv-errors')(ajv);

ajv.addSchema(productsSchema, 'products');
// ajv.addSchema(salesSchema, 'sales');

module.exports = ajv;
