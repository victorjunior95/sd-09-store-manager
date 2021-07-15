// A fim de melhorar as mensagens e status, esse componente é necessário
const status = {
  created: 201,
  unprocessable: 422,
  OK: 200,
  notFound: 404,
};

const message = {
  nameLength: '"name" length must be at least 5 characters long',
  productExists: 'Product already exists',
  quanitityLength: '"quantity" must be larger than or equal to 1',
  quantityType: '"quantity" must be a number',
  wrongIdFormat: 'Wrong id format',
  // Req 5 => mensagem de erro, conectada ao middleware
  invalidQuantity: 'Wrong product ID or invalid quantity',
  // Req 6
  saleNotFound: 'Sale not found',
};

const code = {
  invalidData: 'invalid_data',
  notFound: 'not_found',
};

module.exports = {
  status,
  message,
  code,
};
