/* const joi = require('joi');

const size = 5;

const schema = joi.object().keys({
  name: joi.string().min(size).required().messages(),
  quantity: joi.number().integer().min(1).messages(),
});

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;
  const validateData = schema.validate({ name, quantity });
  console.log(validateData.error.details[0].message);
}; */