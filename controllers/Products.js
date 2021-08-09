const Joi = require('joi');
const rescue = require('express-rescue');
const service = require('../services/Products');

const create = rescue(async (req, res) => {
  const {name, quantity} = req.body;
  const duzentos = 200;
  res.status(duzentos).send({name, quantity});
});

module.exports = {

};
