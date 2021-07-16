// Req 5
const express = require('express');
const services = require('../services/Sales');
const { status, code, message } = require('../schema/status');
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
// Req 6 => rota para o search
routes.get('/:id', validateId, async (req, res) => { // invocando o middleware de validação 
  const { id } = req.params; // captura o que vem da url
  const soldProducts = await services.findById(id);
  if (!soldProducts) { // Caso o produto não exista vai retornar um erro
    return res.status(status.notFound)
      .json({ err: { code: code.notFound, message: message.saleNotFound } });
  }
  return res.status(status.OK).json(soldProducts); // Caso exista vai retornar uma msg ok
});
// Req 7 => rota do Update
routes.put('/:id', validateQuantity, async (req, res) => { // invocando o middleware de validação de quantidade
  const { id } = req.params; // captura o que foi digitado na url
  const itensSold = req.body; // pego o que foi passado no json
  await services.updateById(id, itensSold); // vou passar as 2 para atualizar o BD
  return res.status(status.OK).json({ _id: id, itensSold }); // msg de sucesso 
});
// Req 8 => rota do delete
routes.delete('/:id', async (req, res) => {
  const { id } = req.params; //captura o que foi digitado na url
  const idLength = 24; 
  if(id.length !== idLength) { // caso o id passado não seja igual a 24 vai gerar uma mensagem de erro
    return res.status(status.unprocessable)
      .json({ err: { code: code.invalidData, message: message.wrongSaleIdFormat }});
  }
  const sale = await services.findById(id); // vou ver se existe no BD
  if (!sale) return res.status(status.notFound) // pois se não existe no BD deve retornar um erro
    .json({ err: { code: code.notFound, message: message.saleNotFound }});
  await services.deleteById(id); // caso exista no BD vai ser deletado
  return res.status(status.OK).json(sale); // e vai retornar uma mensagem de sucesso
});

module.exports = routes;
