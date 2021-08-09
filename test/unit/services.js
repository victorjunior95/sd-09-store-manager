const sinon = require('sinon');
const { expect } = require('chai');

const StoreModel = require('../../models/storeModel');
const StoreService = require('../../services/storeService');
const Validation = require('../../services/validation');


const SalesModel = require('../../models/salesModel');
const SalesService = require('../../services/salesService');

const ID_VALID_1 = '60c13544b7b98a438cb1e2bc';
const NAME_VALID_1 = 'Produto do Batista';
const QUANTITY_VALID_1 = 100;

const ID_VALID_2 = '60c13544b7b98a438cb1e2cd';
const NAME_VALID_2 = 'Produto do Silva';
const QUANTITY_VALID_2 = 10;


const ID_VALID_3 = '60c6bbd36597202f5d3565ee';
const NAME_VALID_3 = 'Produto da Joana';
const QUANTITY_VALID_3 = 50;

const ID_VALID_4 = '60c6bbd36597202f5d3565ff';
const NAME_VALID_4 = 'Produto da Olivia';
const QUANTITY_VALID_4 = 5;

const ID_INVALID = '12345'
const NAME_INVALID = 'Pro';
const QUANTITY_INVALID = -100;

const ID_SALE_1 = '5f43a7ca92d58904914656b6';
const ID_SALE_2 = '5f43a7ca92d58904914656c7';

const productResult = {
  _id: ID_VALID_1,
  name: NAME_VALID_1,
  quantity: QUANTITY_VALID_1,
};

const productsResults = [
  { _id: ID_VALID_1, name: NAME_VALID_1, quantity: QUANTITY_VALID_1 },
  { _id: ID_VALID_2, name: NAME_VALID_2, quantity: QUANTITY_VALID_2 },
];

const payloadSales_1 = [
  { productId: ID_VALID_1, quantity: QUANTITY_VALID_1 },
  { productId: ID_VALID_2, quantity: QUANTITY_VALID_2 },
];

const payloadSales_2 = [
  { productId: ID_VALID_3, quantity: QUANTITY_VALID_3 },
  { productId: ID_VALID_4, quantity: QUANTITY_VALID_4 },
];

const saleResult = [
  { _id: ID_SALE_1, itensSold: payloadSales_1 },
];

const salesResults = [
  { _id: ID_SALE_1, itensSold: payloadSales_1 },
  { _id: ID_SALE_2, itensSold: payloadSales_2 },
];

describe('Na camada SERVICES', () => {
  describe('ao chamar CREATE para inserir um novo produto', () => {
    describe('quando o payload contem no nome uma string com o tamanho menor do que 5 caracteres', () => {
      it('o retorno é um objeto Joi', async () => {
        const response = await StoreService.create(NAME_INVALID, QUANTITY_VALID_1);
        expect(response.isJoi).to.be.equal(true);
      });
  
      it('o retorno é proveniente da validaçao "string.min"', async () => {
        const response = await StoreService.create(NAME_INVALID, QUANTITY_VALID_1);
        expect(response.details[0].type).to.be.equal('string.min');
      });
    });
  
    describe('quando o payload contem na quantidade um inteiro menor do que 0', () => {
      it('o retorno é um objeto Joi', async () => {
        const response = await StoreService.create(NAME_VALID_1, QUANTITY_INVALID);
        expect(response.isJoi).to.be.equal(true);
      });
  
      it('o retorno é proveniente da validaçao "number.min"', async () => {
        const response = await StoreService.create(NAME_VALID_1, QUANTITY_INVALID);
        expect(response.details[0].type).to.be.equal('number.min');
      });
    });
  
    describe('o nome do novo produto já existe no banco de dados', () => {     
      before(() => {
        sinon.stub(StoreModel, 'getByIdOrName').resolves(productResult);
      });
  
      after(() => {
        StoreModel.getByIdOrName.restore();
      });
  
      it('o retorno é um erro "Product already exists"', async () => {
        const response = await StoreService.create(NAME_VALID_1, QUANTITY_VALID_1);
        expect(response.message).to.be.equal('Product already exists');
      });
    });
  
    describe('o produto não existe no banco de dados e é adicionado com sucesso', () => {
      before(() => {
        sinon.stub(StoreModel, 'getByIdOrName').resolves(null);
        sinon.stub(StoreModel, 'create').resolves(productResult);
      });
  
      after(() => {
        StoreModel.getByIdOrName.restore();
        StoreModel.create.restore();
      });
  
      it('retorna um objeto', async () => {
        const response = await StoreService.create(NAME_VALID_1, QUANTITY_VALID_1);
        expect(response).to.be.a('object');
      });
  
      it('retorna objeto com "_id", "name" e "quantity" do produto inserido', async () => {
        const response = await StoreService.create(NAME_VALID_1, QUANTITY_VALID_1);
        expect(response).to.include.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('ao chamar GETALL para buscar todos os produtos', () => {
    describe('quando não existe produtos criados', () => {
      before(() => {
        sinon.stub(StoreModel, 'getAll').resolves([]);
      });
  
      after(() => {
        StoreModel.getAll.restore();
      });
  
      it('o retorno é uma array vazia', async () => {
        const response = await StoreService.getAll();
        expect(response).to.be.an('array');
        expect(response).to.be.empty;
      });
    });
  
    describe('quando existem produtos criados', () => {
      before(() => {
        sinon.stub(StoreModel, 'getAll').resolves(productsResults);
      });
  
      after(() => {
        StoreModel.getAll.restore();
      });
  
      it('retorna um array', async () => {
        const response = await StoreService.getAll();
        expect(response).to.be.an('array');
      });

      it('o array não está vazio', async () => {
        const response = await StoreService.getAll();
        expect(response).to.be.not.empty;
      });
  
      it('o array possuem itens do tipo objeto', async () => {
        const [ item ] = await StoreService.getAll();
        expect(item).to.be.an('object');
      });
  
      it('tais itens possuem as propriedades "_id", "name" e "quantity"', async () => {
        const [ item ] = await StoreService.getAll();
        expect(item).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });

  describe('ao chamar GETBYIDORNAME para buscar um produto através do ID', () => {
    describe('quando Id não é válido', () => {
      before(() => {
        sinon.stub(StoreModel, 'getByIdOrName').resolves(null);
      });
  
      after(() => {
        StoreModel.getByIdOrName.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong id format"', async () => {
        const response = await StoreService.getByIdOrName(ID_INVALID);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong id format');
      });
    });

    describe('quando não é encontrado uma correspondência', () => {
      before(() => {
        sinon.stub(StoreModel, 'getByIdOrName').resolves(null);
      });
  
      after(() => {
        StoreModel.getByIdOrName.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong id format"', async () => {
        const response = await StoreService.getByIdOrName(ID_VALID_1);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong id format');
      });
    });
      
    describe('quando existe uma correspondência', () => {
      before(() => {
        sinon.stub(StoreModel, 'getByIdOrName').resolves(productResult);
      });
  
      after(() => {
        StoreModel.getByIdOrName.restore();
      });
  
      it('retorna um objeto', async () => {
        const response = await StoreService.getByIdOrName(ID_VALID_1);
        expect(response).to.be.a('object');
      });
  
      it('o objeto possui as propriedades "_id", "name" e "quantity"', async () => {
        const response = await StoreService.getByIdOrName(ID_VALID_1);
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });

  describe('ao chamar UPDATEBYID para buscar um produto através do ID', () => {
    describe('quando Id não é válido', () => {
      before(() => {
        sinon.stub(StoreModel, 'updateById').resolves({ modifiedCount: 0 });
      });
  
      after(() => {
        StoreModel.updateById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong id format"', async () => {
        const response = await StoreService.updateById(ID_INVALID, NAME_VALID_1, QUANTITY_VALID_1);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong id format');
      });
    });
  
    describe('quando o payload contem no nome uma string com o tamanho menor do que 5 caracteres', () => {  
      it('o retorno é um objeto Joi', async () => {
        const response = await StoreService.updateById(ID_VALID_1, NAME_INVALID, QUANTITY_VALID_1);
        expect(response.isJoi).to.be.equal(true);
      });
  
      it('o retorno é proveniente da validaçao "string.min"', async () => {
        const response = await StoreService.updateById(ID_VALID_1, NAME_INVALID, QUANTITY_VALID_1);
        expect(response.details[0].type).to.be.equal('string.min');
      });
    });
  
    describe('quando o payload contem na quantidade um inteiro menor do que 0', () => {
      it('o retorno é um objeto Joi', async () => {
        const response = await StoreService.updateById(ID_VALID_1, NAME_VALID_1, QUANTITY_INVALID);
        expect(response.isJoi).to.be.equal(true);
      });
  
      it('o retorno é proveniente da validaçao "number.min"', async () => {
        const response = await StoreService.updateById(ID_VALID_1, NAME_VALID_1, QUANTITY_INVALID);
        expect(response.details[0].type).to.be.equal('number.min');
      });
    });
    
    describe('quando existe uma correspondência', () => {
      before(() => {
        sinon.stub(StoreModel, 'updateById').resolves({ modifiedCount: 1 });
      });
      
      after(() => {
        StoreModel.updateById.restore();
      });
      
      it('retorna um objeto', async () => {
        const response = await StoreService.updateById(ID_VALID_1, NAME_VALID_1, QUANTITY_VALID_1);
        expect(response).to.be.an('object');
      });
      
      it('o objeto possui as propriedades "modifiedCount"', async () => {
        const response = await StoreService.updateById(ID_VALID_1, NAME_VALID_1, QUANTITY_VALID_1);
        expect(response).to.have.a.property('modifiedCount')
      });
    });
  });

  describe('ao chamar DELETEBYID para deletar um produto através do ID', () => {
    describe('quando Id não é válido', () => {
      before(() => {
        sinon.stub(StoreModel, 'deleteById').resolves(null);
      });
  
      after(() => {
        StoreModel.deleteById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong id format"', async () => {
        const response = await StoreService.deleteById(ID_INVALID);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong id format');
      });
    });

    describe('quando não é encontrado uma correspondência', () => {
      before(() => {
        sinon.stub(StoreModel, 'deleteById').resolves(null);
      });
  
      after(() => {
        StoreModel.deleteById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong id format"', async () => {
        const response = await StoreService.deleteById(ID_VALID_1);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong id format');
      });
    });
      
    describe('quando existe uma correspondência', () => {
      before(() => {
        sinon.stub(StoreModel, 'deleteById').resolves(productResult);
      });
  
      after(() => {
        StoreModel.deleteById.restore();
      });
  
      it('retorna um objeto', async () => {
        const response = await StoreService.deleteById(ID_VALID_1);
        expect(response).to.be.an('object');
      });
  
      it('o objeto possui as propriedades "_id", "name" e "quantity"', async () => {
        const response = await StoreService.deleteById(ID_VALID_1);
        expect(response).to.include.all.keys('_id', 'name', 'quantity')
      });
    });
  });

  describe('ao chamar CREATE para cadastrar uma nova venda', () => {  
    describe('quando o payload contem uma quantidade com um inteiro menor do que 0', () => {
      const payloadSales = [
        { productId: ID_VALID_1, quantity: QUANTITY_INVALID },
        { productId: ID_VALID_2, quantity: QUANTITY_INVALID },
      ];
      
      it('o retorno é um objeto com propriedade "message"', async () => {
        const response = await SalesService.create(payloadSales);
        expect(response).to.have.a.property('message');
      });
    });

    describe('quando o payload contem um id inválido', () => {
      const payloadSales = [
        { productId: ID_INVALID, quantity: QUANTITY_VALID_1 },
        { productId: ID_INVALID, quantity: QUANTITY_VALID_2 },
      ];
      
      it('o retorno é um objeto com propriedade "message"', async () => {
        const response = await SalesService.create(payloadSales);
        expect(response).to.have.a.property('message');
      });
    });
  
    describe('o cadastro da venda falha, porque o id não existe no banco de dados', () => {     
      const payloadSales = [
        { productId: ID_VALID_1, quantity: QUANTITY_VALID_1 },
        { productId: ID_VALID_2, quantity: QUANTITY_VALID_2 },
      ];

      before(() => {
        sinon.stub(StoreModel, 'getByIds').resolves([]);
      });
  
      after(() => {
        StoreModel.getByIds.restore();
      });
  
      it('o retorno é um objeto com propriedade "message"', async () => {
        const response = await SalesService.create(payloadSales);
        expect(response).to.have.a.property('message');
      });
    });

    describe('o id existe no banco de dados, quantidade é suficiente e cadastro é efetuado com sucesso', () => {     
      const payloadSales = [
        { productId: ID_VALID_1, quantity: QUANTITY_VALID_1 },
        { productId: ID_VALID_2, quantity: QUANTITY_VALID_2 },
      ];

      const resultById = [
        { _id: ID_VALID_1, name: NAME_VALID_1, quantity: QUANTITY_VALID_1 },
        { _id: ID_VALID_2, name: NAME_VALID_2, quantity: QUANTITY_VALID_2 },
      ];

      const result = {
        itensSold: payloadSales,
        _id: '60c6c65d71dfe53c7a466acd',
      };

      before(() => {
        sinon.stub(StoreModel, 'getByIds').resolves(resultById);
        sinon.stub(SalesModel, 'create').resolves(result);
        sinon.stub(Validation, 'subtractQuantity').resolves(false);
      });
  
      after(() => {
        StoreModel.getByIds.restore();
        SalesModel.create.restore();
        Validation.subtractQuantity.restore();
      });
  
      it('retorna objeto com "_id" e "itensSold" da venda inserida', async () => {
        const response = await SalesService.create(payloadSales);
        expect(response).to.include.all.keys('_id', 'itensSold')
      });

      it('na propriedade "itensSold" com um array de objetos', async () => {
        const { itensSold } = await SalesService.create(payloadSales);
        expect(itensSold).to.be.an('array');
        expect(itensSold[0]).to.be.a('object');
      });
    });

    describe('o id existe no banco de dados, porém a quantidade é insuficiente', () => {     
      const payloadSales = [
        { productId: ID_VALID_1, quantity: QUANTITY_VALID_1 },
        { productId: ID_VALID_2, quantity: QUANTITY_VALID_2 },
      ];

      const resultById = [
        { _id: ID_VALID_1, name: NAME_VALID_1, quantity: QUANTITY_VALID_1 },
        { _id: ID_VALID_2, name: NAME_VALID_2, quantity: QUANTITY_VALID_2 },
      ];

      const result = {
        itensSold: payloadSales,
        _id: '60c6c65d71dfe53c7a466acd',
      };

      before(() => {
        sinon.stub(StoreModel, 'getByIds').resolves(resultById);
        sinon.stub(SalesModel, 'create').resolves(result);
        sinon.stub(Validation, 'subtractQuantity').resolves(true);
      });
  
      after(() => {
        StoreModel.getByIds.restore();
        SalesModel.create.restore();
        Validation.subtractQuantity.restore();
      });
  
      it('o retorno é um objeto com propriedade "message"', async () => {
        const response = await SalesService.create(payloadSales);
        expect(response).to.have.a.property('message');
      });
    });
  });

  describe('ao chamar GETALL para buscar todas as vendas', () => {
    describe('quando não existe produtos criados', () => {
      before(() => {
        sinon.stub(SalesModel, 'getAll').resolves([]);
      });
  
      after(() => {
        SalesModel.getAll.restore();
      });
  
      it('o retorno é uma array vazia', async () => {
        const response = await SalesService.getAll();
        expect(response).to.be.an('array');
        expect(response).to.be.empty;
      });
    });
  
    describe('quando existem produtos criados', () => {
      before(() => {
        sinon.stub(SalesModel, 'getAll').resolves(salesResults);
      });
  
      after(() => {
        SalesModel.getAll.restore();
      });
  
      it('retorna um array', async () => {
        const response = await SalesService.getAll();
        expect(response).to.be.an('array');
      });

      it('o array não está vazio', async () => {
        const response = await SalesService.getAll();
        expect(response).to.be.not.empty;
      });
  
      it('o array possuem itens do tipo objeto', async () => {
        const [ item ] = await SalesService.getAll();
        expect(item).to.be.an('object');
      });
  
      it('tais itens possuem as propriedades "_id" e "itensSold"', async () => {
        const [ item ] = await SalesService.getAll();
        expect(item).to.include.all.keys('_id', 'itensSold');
      });
    });
  });

  describe('ao chamar GETBYID para buscar um produto através do ID', () => {
    describe('quando Id não é válido', () => {
      before(() => {
        sinon.stub(SalesModel, 'getById').resolves(null);
      });
  
      after(() => {
        SalesModel.getById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Sale not found"', async () => {
        const response = await SalesService.getById(ID_INVALID);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Sale not found');
      });
    });

    describe('quando não é encontrado uma correspondência', () => {
      before(() => {
        sinon.stub(SalesModel, 'getById').resolves(null);
      });
  
      after(() => {
        SalesModel.getById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Sale not found"', async () => {
        const response = await SalesService.getById(ID_VALID_1);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Sale not found');
      });
    });
      
    describe('quando existe uma correspondência', () => {
      before(() => {
        sinon.stub(SalesModel, 'getById').resolves(saleResult);
      });
  
      after(() => {
        SalesModel.getById.restore();
      });
  
      it('retorna um array não vazio', async () => {
        const response = await SalesService.getById(ID_VALID_1);
        expect(response).to.be.an('array');
      });
  
      it('o array possuem itens do tipo objeto', async () => {
        const [ item ] = await SalesService.getById(ID_VALID_1);
        expect(item).to.be.a('object');
      });

      it('tais itens possuem as propriedades "_id" e "itensSold"', async () => {
        const [ item ] = await SalesService.getById(ID_VALID_1);
        expect(item).to.include.all.keys('_id', 'itensSold');
      });
    });
  });

  describe('ao chamar UPDATEBYID para buscar uma venda através do ID', () => {
    describe('quando ID da venda não é válido', () => { 
      it('o retorno é um objeto com mensagem "Wrong product ID or invalid quantity"', async () => {
        const response = await SalesService.updateById(ID_INVALID, ID_VALID_1, QUANTITY_VALID_1);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong product ID or invalid quantity');
      });
    });

    describe('quando ID do produto não é válido', () => {
      it('o retorno é um objeto com mensagem "Wrong product ID or invalid quantity"', async () => {
        const response = await SalesService.updateById(ID_SALE_1, ID_INVALID, QUANTITY_VALID_1);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong product ID or invalid quantity');
      });
    });
  
    describe('quando o payload contem na quantidade um inteiro menor do que 0', () => {
      it('o retorno é um objeto com mensagem "Wrong product ID or invalid quantity"', async () => {
        const response = await SalesService.updateById(ID_SALE_1, ID_VALID_1, QUANTITY_INVALID);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong product ID or invalid quantity');
      });
    });
    
    describe('quando existe uma correspondência e quantidade é suficiente', () => {
      before(() => {
        sinon.stub(SalesModel, 'updateById').resolves({ modifiedCount: 1 });
        sinon.stub(Validation, 'updatingQuantity').resolves(false);
      });
      
      after(() => {
        SalesModel.updateById.restore();
        Validation.updatingQuantity.restore();
      });
      
      it('retorna um objeto', async () => {
        const response = await SalesService.updateById(ID_SALE_1, ID_VALID_1, QUANTITY_VALID_1);
        expect(response).to.be.a('object');
      });
      
      it('o objeto possui as propriedades "modifiedCount"', async () => {
        const response = await SalesService.updateById(ID_SALE_1, ID_VALID_1, QUANTITY_VALID_1);
        expect(response).to.have.a.property('modifiedCount')
      });
    });

    describe('quando existe uma correspondência, porém a quantidade não é suficiente', () => {
      before(() => {
        sinon.stub(SalesModel, 'updateById').resolves({ modifiedCount: 1 });
        sinon.stub(Validation, 'updatingQuantity').resolves(true);
      });
      
      after(() => {
        SalesModel.updateById.restore();
        Validation.updatingQuantity.restore();
      });
      
      it('retorna um objeto com mensagem "Such amount is not permitted to sell"', async () => {
        const response = await SalesService.updateById(ID_SALE_1, ID_VALID_1, QUANTITY_VALID_1);
        expect(response.message).to.be.equal('Such amount is not permitted to sell');
      });
    });
  });





  describe('ao chamar DELETEBYID para deletar uma venda através do ID', () => {
    describe('quando Id não é válido', () => {
      before(() => {
        sinon.stub(SalesModel, 'deleteById').resolves([]);
      });
  
      after(() => {
        SalesModel.deleteById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong sale ID format"', async () => {
        const response = await SalesService.deleteById(ID_INVALID);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong sale ID format');
      });
    });

    describe('quando não é encontrado uma correspondência', () => {
      before(() => {
        sinon.stub(SalesModel, 'deleteById').resolves(null);
      });
  
      after(() => {
        SalesModel.deleteById.restore();
      });
  
      it('o retorno é um objeto com mensagem "Wrong sale ID format"', async () => {
        const response = await SalesService.deleteById(ID_VALID_1);
        expect(response).to.be.a('object');
        expect(response.message).to.be.equal('Wrong sale ID format');
      });
    });

    describe('quando existe uma correspondência', () => {
      before(() => {
        sinon.stub(SalesModel, 'deleteById').resolves(saleResult);
        sinon.stub(Validation, 'addingQuantity').resolves();
      });
  
      after(() => {
        SalesModel.deleteById.restore();
        Validation.addingQuantity.restore();
      });
  
      it('retorna um array de objeto', async () => {
        const response = await SalesService.deleteById(ID_VALID_1);
        expect(response).to.be.an('array');
      });
  
      it('o objeto possui as propriedades "_id" e "itensSold"', async () => {
        const [item] = await SalesService.deleteById(ID_VALID_1);
        expect(item).to.include.all.keys('_id', 'itensSold')
      });
    });
  });
});
