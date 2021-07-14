const express = require('express');
const services = require('../services/products');
const { status } = require('../schema/status');
const { validateName, validateQuantity, validateId } =
 require('../middlewares/productsValidation');

const routes = express.Router();
// Req 1 => Cria a rota post para pegar o que for passado
routes.post('/', validateName, validateQuantity, async (req, res) => { // Para a funçao seguir em frente, é necessário passar pelos middlewares
  const { name, quantity } = req.body; //Captura o que for digitado no json
  const createdProduct = await services.create(name, quantity);
  if (createdProduct.isError) return res.status(createdProduct.status) // Algum erro vai gerar o status e json de erro
    .json({ err: { code: createdProduct.code, message: createdProduct.message} });
  return res.status(status.created).json(createdProduct); // Se der certo, retorna o status + msg
});

// Req 2 => A rota tras todos os dados do BD
routes.get('/', async (_req, res) => {
  const products = await services.findAll();
  return res.status(status.OK).json({ products });
});
// Req 2 => Caso passe um id específico, vai retornar aquele dado
routes.get('/:id', validateId, async (req, res) => { // vai chamar caso passe no middleware
  const { id } = req.params; // captura o que foi digitado na url
  const product = await services.findById(id);
  return res.status(status.OK).json(product);
});
// Req 3 
routes.put('/:id', validateName, validateQuantity, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await services.updateById(id, name, quantity);
  return res.status(status.OK).json({ _id: id, name, quantity });
});
// Req 4
routes.delete('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await services.deleteById(id);
  return res.status(status.OK).json(deleteProduct);
});

module.exports = routes;
