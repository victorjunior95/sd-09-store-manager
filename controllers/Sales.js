// Req 5
const express = require('express');
const services = require('../services/Sales');
const { status } = require('../schema/status');
const { validateQuantity, validateId } = require('../middlewares/SalesValidation');

const routes = express.Router();
// para criar é necessário passar pela validação do middleware
routes.post('/', validateQuantity, async (req, res) => {
  const itensSold = req.body; // captura o que foi digitado no corpo
  const registerSale = await services.register(itensSold); // registra no bd
  return res.status(status.OK).json(registerSale); // mensagem ok
});
// Req 6 => rota para mostrar as vendas
routes.get('/', async (_req, res) => {
  const soldProducts = await services.findAll();
  return res.status(status.OK).json(soldProducts);
});
// Req 6 => rota
routes.get('/:id', validateId, async (req, res) => {
  const { id } = req.params; // captura o que vem da url
  const soldProducts = await services.findById(id);
  if (!soldProducts) { // Caso o produto não exista vai retornar um erro
    return res.status(status.notFound)
      .json({ err: { code: code.notFound, message: message.saleNotFound } });
  }
  return res.status(status.OK).json(soldProducts); // Caso exista vai retornar uma msg ok
});
// Req 7
routes.put('/:id', validateQuantity, async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  await services.updateById(id, itensSold);
  return res.status(status.OK).json({ _id: id, itensSold });
});

module.exports = routes;
