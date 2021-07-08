const productsServices = require('../services/products');

// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
const STATUS_200 = 200; // Respostas de sucesso (200-299)
const STATUS_201= 201;
const STATUS_422 = 422; // Erros do cliente (400-499)

// CREATE ----------------------------------------
const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsServices.create(name, quantity);
  if (newProduct !== null) {
    return res.status(STATUS_201).json(newProduct);
  } else { return res.status(STATUS_422).json({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  });
  }
};

const getAll = async (req, res) => {
    const products = await productsServices.getAll();
    res.status(200).json(products);
};

// const findById = rescue(async (req, res, next) => {
//     // Extraímos o id da request
//     const { id } = req.params;
//     // Pedimos para o service buscar o autor
//     const author = await service.findById(id);
//     // Caso o service retorne um erro, interrompemos o processamento
//     // e inicializamos o fluxo de erro
//     if (author.error) return next(author.error);
//     // Caso não haja nenhum erro, retornamos o author encontrado
//     res.status(200).json(author);
// });

// const create = rescue(async (req, res, next) => {
//     // Utilizamos o Joi para descrever o objeto que esperamos
//     // receber na requisição. Para isso, chamamos Joi.object()
//     // passando um objeto com os campos da requisição e suas descrições
//     const { error } = Joi.object({
//       // Deve ser uma string (.string()) não vazia (.not().empty()) e é obrigatório (.required())
//       firstName: Joi.string().not().empty().required(),
//       // Não é obrigatório mas, caso seja informado, deve ser uma string não vazia
//       middleName: Joi.string().not().empty(),
//       // Deve ser uma string não vazia e é obrigatório
//       lastName: Joi.string().not().empty().required(),
//     })
//     // Por fim, pedimos que o Joi verifique se o corpo da requisição se adequa a essas regras
//       .validate(req.body);
//     // Caso exista algum problema com a validação, iniciamos o fluxo de erro e interrompemos o middleware.
//     if (error) {
//       return next(error);
//     }
//     // Caso não haja erro de validação, prosseguimos com a criação do usuário
//     const { firstName, middleName, lastName } = req.body;
//     const newAuthor = await service.create(firstName, middleName, lastName);
//     // Caso haja erro na criação do autor, iniciamos o fluxo de erro
//     if (newAuthor.error) return next(newAuthor.error);
//     // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
//     // do novo autor
//     return res.status(201).json(newAuthor);
//   });
  

module.exports = {
    // findById,
    getAll,
    create
};