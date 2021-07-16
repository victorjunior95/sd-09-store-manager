// Req 5 => Esse middleware vai fazer validações referentes a rota /services
const rescue = require('express-rescue');

const { status, message, code } = require('../schema/status');

const validateQuantity = rescue((req, res, next) => {
  const itensSold = req.body;
  const minQuantity = 1;
  // Validação para o produto cadastrado ter pelo menos 1 quantidade em estoque e esse produduto deverá ser uma string
  const items = itensSold.every((item) => {
    if (item.quantity < minQuantity) {
      return res.status(status.unprocessable)
        .json({ err: { code: code.invalidData, message: message.invalidQuantity } });
    }
    if (typeof item.quantity === 'string') {
      return res.status(status.unprocessable)
        .json({ err: { code: code.invalidData, message: message.invalidQuantity } });
    }
  });
  // Se tudo der certo, vai chamar o próximo middleware
  next();
});
// Req 6 => Validação para ver se o id passado pela url existe e se tem mais de 24 caracteres
const validateId = rescue(async (req, res, next) => {
  const { id } = req.params; // captura o que foi digitado no json
  const idLength = 24;
  if (!id || id.length !== idLength) { // caso não tenha 24 caracteres ou não exista
    return res.status(status.notFound) // Ai cai no caso de erro
      .json({ err: { code: code.notFound, message: message.saleNotFound } });
  }
  next(); // se não cair no erro pode prosseguir para a função
});

module.exports = {
  validateQuantity,
  validateId
};
