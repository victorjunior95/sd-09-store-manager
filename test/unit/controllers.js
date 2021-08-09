const sinon = require('sinon');
const { expect } = require('chai');

const StoreService = require('../../services/storeService');
const StoreController = require('../../controllers/storeController');
const SalesService = require('../../services/salesService');
const SalesController = require('../../controllers/salesController');

const ID_VALID_1 = '5f43a7ca92d58904914656b6';
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

const ID_INVALID = '12345';
const QUANTITY_INVALID = -100;

const ID_SALE_1 = '5f43a7ca92d58904914656b6';
const ID_SALE_2 = '5f43a7ca92d58904914656c7';

const payloadProduct = {
  name: NAME_VALID_1,
  quantity: QUANTITY_VALID_1,
};

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

describe('Na camada CONTROLLERS', () => {
  describe('ao chamar CREATE para inserir um novo produto', () => {
    describe('quando o payload informado não é válido', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        isJoi: true,
        details: [{
          message: 'validate error JOI',
        }],
      };
  
      before(() => {
        request.body = {};
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'create').resolves(error);
      });
  
      after(() => {
        StoreService.create.restore();
      });
  
      it('chama o método next com uma string', async () => {
        await StoreController.create(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('validate error JOI')).to.be.equal(true);
      });
    });
  
    describe('quando já existe um produto com mesmo nome', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        message: 'Product already exists',
      };
  
      before(() => {
        request.body = {};
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'create').resolves(error);
      });
  
      after(() => {
        StoreService.create.restore();
      });
  
      it('chama o método next com a string de erro', async () => {
        await StoreController.create(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Product already exists')).to.be.equal(true);
      });
    });
  
    describe('quando é inserido com sucesso', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = payloadProduct;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'create').resolves(productResult);
      });
  
      after(() => {
        StoreService.create.restore();
      });
  
      it('é chamado o status com o código 201', async () => {
        await StoreController.create(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('é chamado o json com objeto do produto adicionado', async () => {
        await StoreController.create(request, response);
        expect(response.json.calledWith(productResult)).to.be.equal(true);
      });
    });
  });

  describe('ao chamar GETALL para buscar todos os produtos', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'getAll').resolves([]);
      })
  
      after(() => {
        StoreService.getAll.restore();
      })
  
      it('é chamado o método "status" passando 200', async () => {
        await StoreController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto com propriedade "products" e com valor uma array vazia', async () => {
        await StoreController.getAll(request, response);
        expect(response.json.calledWith({ products: [] })).to.be.equal(true);
      });
    });
  
    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};
  
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'getAll').resolves(productsResults);
      })
  
      after(() => {
        StoreService.getAll.restore();
      })
  
      it('é chamado o método "status" passando o código 200', async () => {
        await StoreController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto com propriedade "products"', async () => {
        await StoreController.getAll(request, response);
        expect(response.json.calledWith({ products: productsResults })).to.be.equal(true);
      });
    });
  });

  describe('ao chamar GETBYIDORNAME para buscar um produto específico', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        message: 'Wrong id format',
      };
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'getByIdOrName').resolves(error);
      })
  
      after(() => {
        StoreService.getByIdOrName.restore();
      })

      it('chama o método next com a string de erro', async () => {
        await StoreController.getByIdOrName(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Wrong id format')).to.be.equal(true);
      });
    });
  
    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};

      before(() => {
        request.params = { id: ID_VALID_1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'getByIdOrName').resolves(productResult);
      })
  
      after(() => {
        StoreService.getByIdOrName.restore();
      })
  
      it('é chamado o método "status" passando o código 200', async () => {
        await StoreController.getByIdOrName(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await StoreController.getByIdOrName(request, response);
        expect(response.json.calledWith(productResult)).to.be.equal(true);
      });
    });
  });

  describe('ao chamar UPDATEBYID para buscar um produto específico', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = { message: 'Wrong id format'};

      before(() => {
        request.params = { id: ID_VALID_1 };
        request.body = payloadProduct;
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'updateById').resolves(error);
      })
  
      after(() => {
        StoreService.updateById.restore();
      })

      it('chama o método next com a string de erro', async () => {
        await StoreController.updateById(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Wrong id format')).to.be.equal(true);
      });
    });

    describe('quando o payload informado não é válido', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        isJoi: true,
        details: [{
          message: 'validate error JOI',
        }],
      };
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        request.body = payloadProduct;
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'updateById').resolves(error);
      });
  
      after(() => {
        StoreService.updateById.restore();
      });
  
      it('chama o método next com objeto', async () => {
        await StoreController.updateById(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('validate error JOI')).to.be.equal(true);
      });
    });
  
    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        request.body = payloadProduct;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'updateById').resolves({ modifiedCount: 1 });
      })
  
      after(() => {
        StoreService.updateById.restore();
      })
  
      it('é chamado o método "status" passando o código 200', async () => {
        await StoreController.updateById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await StoreController.updateById(request, response);
        expect(response.json.calledWith(productResult)).to.be.equal(true);
      });
    });
  });

  describe('ao chamar DELETEBYID para deletar um produto específico', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        message: 'Wrong id format',
      };
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        next = sinon.stub().returns();
        sinon.stub(StoreService, 'deleteById').resolves(error);
      })
  
      after(() => {
        StoreService.deleteById.restore();
      })

      it('chama o método next com a string de erro', async () => {
        await StoreController.deleteById(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Wrong id format')).to.be.equal(true);
      });
    });
  
    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(StoreService, 'deleteById').resolves(productResult);
      })
  
      after(() => {
        StoreService.deleteById.restore();
      })
  
      it('é chamado o método "status" passando o código 200', async () => {
        await StoreController.deleteById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await StoreController.deleteById(request, response);
        expect(response.json.calledWith(productResult)).to.be.equal(true);
      });
    });
  });

  describe('ao chamar CREATE para cadastrar uma nova venda', () => {
    describe('quando o payload informado não é válido', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = { message: 'Wrong product ID or invalid quantity' };
  
      before(() => {
        request.body = {};
        next = sinon.stub().returns();
        sinon.stub(SalesService, 'create').resolves(error);
      });
  
      after(() => {
        SalesService.create.restore();
      });
  
      it('chama o método next com objeto', async () => {
        await SalesController.create(request, response, next);
        expect(next.calledWith(error.message)).to.be.equal(true);
      });
    });
  
    describe('quando é inserido com sucesso', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = payloadSales_1;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(SalesService, 'create').resolves(salesResults);
      });
  
      after(() => {
        SalesService.create.restore();
      });
  
      it('é chamado o status com o código 200', async () => {
        await SalesController.create(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o json com objeto do produto adicionado', async () => {
        await SalesController.create(request, response);
        expect(response.json.calledWith(salesResults)).to.be.equal(true);
      });
    });
  });

  describe('ao chamar GETALL para buscar todas as vendas', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(SalesService, 'getAll').resolves([]);
      })
  
      after(() => {
        SalesService.getAll.restore();
      })
  
      it('é chamado o método "status" passando 200', async () => {
        await SalesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto com a propriedade "sales" e com valor uma array vazia', async () => {
        await SalesController.getAll(request, response);
        expect(response.json.calledWith({ sales: [] })).to.be.equal(true);
      });
    });
  
    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};
  
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(SalesService, 'getAll').resolves(salesResults);
      })
  
      after(() => {
        SalesService.getAll.restore();
      })
  
      it('é chamado o método "status" passando o código 200', async () => {
        await SalesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto com propriedade "sales"', async () => {
        await SalesController.getAll(request, response);
        expect(response.json.calledWith({ sales: salesResults })).to.be.equal(true);
      });
    });
  });

  describe('ao chamar GETBYID para buscar uma venda específica', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        message: 'Sale not found',
      };
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        next = sinon.stub().returns();
        sinon.stub(SalesService, 'getById').resolves(error);
      })
  
      after(() => {
        SalesService.getById.restore();
      })

      it('chama o método next com a string de erro "Sale not found', async () => {
        await SalesController.getById(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Sale not found')).to.be.equal(true);
      });
    });
  
    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};

      before(() => {
        request.params = { id: ID_VALID_1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(SalesService, 'getById').resolves(saleResult);
      })
  
      after(() => {
        SalesService.getById.restore();
      })
  
      it('é chamado o método "status" passando o código 200', async () => {
        await SalesController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await SalesController.getById(request, response);
        expect(response.json.calledWith(saleResult)).to.be.equal(true);
      });
    });
  });

  describe('ao chamar UPDATEBYID para buscar uma venda específica', () => {
    describe('quando payload "id da venda", "id do produto" ou "quantidade" não é válido', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = { message: 'Wrong product ID or invalid quantity'};

      before(() => {
        request.params = { id: ID_INVALID };
        request.body = [{ productId: ID_INVALID, quantity: QUANTITY_INVALID }];
        next = sinon.stub().returns();
        sinon.stub(SalesService, 'updateById').resolves(error);
      })
  
      after(() => {
        SalesService.updateById.restore();
      })

      it('chama o método next com a string de erro', async () => {
        await SalesController.updateById(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Wrong product ID or invalid quantity')).to.be.equal(true);
      });
    });

    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};
      const payload = [{ productId: ID_VALID_1, quantity: QUANTITY_VALID_1 }];
      const result = { _id: ID_SALE_1, itensSold: [{ productId: ID_VALID_1, quantity: QUANTITY_VALID_1 }] };
      before(() => {
        request.params = { id: ID_VALID_1 };
        request.body = payload;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(SalesService, 'updateById').resolves({ modifiedCount: 1 });
      });
  
      after(() => {
        SalesService.updateById.restore();
      });
  
      it('é chamado o método "status" passando o código 200', async () => {
        await SalesController.updateById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await SalesController.updateById(request, response);
        expect(response.json.calledWith(result)).to.be.equal(true);
      });
    });

    describe('quando existe uma correspondência, porém a quantidade não é suficiente', () => {
      const response = {};
      const request = {};
      let next = {};
      const payload = [{ productId: ID_VALID_1, quantity: QUANTITY_VALID_1 }];
      const error = { message: 'Such amount is not permitted to sell'};
      before(() => {
        request.params = { id: ID_VALID_1 };
        request.body = payload;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, 'updateById').resolves(error);
      })
  
      after(() => {
        SalesService.updateById.restore();
      });

      it('chama o método next com a string de erro', async () => {
        await SalesController.updateById(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Such amount is not permitted to sell')).to.be.equal(true);
      });
    });
  });

  describe('ao chamar DELETEBYID para deletar um produto específico', () => {
    describe('quando não é encontrado uma correspondência', () => {
      const response = {};
      const request = {};
      let next = {};
      const error = {
        message: 'Wrong sale ID format',
      };
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        next = sinon.stub().returns();
        sinon.stub(SalesService, 'deleteById').resolves(error);
      })
  
      after(() => {
        SalesService.deleteById.restore();
      })

      it('chama o método next com a string de erro', async () => {
        await SalesController.deleteById(request, response, next);
        expect(next.calledWith(sinon.match.string)).to.be.equal(true);
        expect(next.calledWith('Wrong sale ID format')).to.be.equal(true);
      });
    });
  
    describe('quando existe uma correspondência', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.params = { id: ID_VALID_1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(SalesService, 'deleteById').resolves(saleResult);
      })
  
      after(() => {
        SalesService.deleteById.restore();
      })
  
      it('é chamado o método "status" passando o código 200', async () => {
        await SalesController.deleteById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await SalesController.deleteById(request, response);
        expect(response.json.calledWith(saleResult[0])).to.be.equal(true);
      });
    });
  });
});
