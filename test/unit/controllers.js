const sinon = require('sinon');
const { expect } = require('chai');

const Service = require('../../services');
const Controller = require('../../controllers');

describe('Cadastro de um novo produto', () => {
  describe('com dados inválidos', () => {
    const response = {};
    const request = {};
    
    const ERROR = { 
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        }
      };

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'addProduct').resolves(ERROR);
    });

    after(() => {
      Service.products.addProduct.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.products.addProduct(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.products.addProduct(request, response);

      expect(response.json.calledWith(ERROR)).to.be.equal(true);
    });
  });

  describe('quando é adicionado com sucesso', () => {
    const response = {};
    const request = {};

    const ID_EXAMPLE = '604cb554311d68f491ba5781';

    const payload = { _id: ID_EXAMPLE, ...request.body };

    before(() => {
      request.body = {
        name: 'Testy, the Tester',
        quantity: 30,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'addProduct').resolves(payload);
    });

    after(() => {
      Service.products.addProduct.restore();
    });

    it('é chamado o método "status" com o código 201', async () => {
      await Controller.products.addProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método "json" com as informações do produto', async () => {
      await Controller.products.addProduct(request, response);

      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

describe('Carrega a lista de produtos', () => {
  describe('quando não tem nenhum cadastrado',() => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(Service.products, 'getProducts').resolves([]);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      Service.products.getProducts.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.products.getProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" com um array vazio', async () => {
      await Controller.products.getProducts(request, response);

      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('quando tem produtos cadastrados', () => {
    const request = {};
    const response = {};

    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before(() => {
      sinon.stub(Service.products, 'getProducts').resolves([payload]);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      Service.products.getProducts.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.products.getProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" com um array de produtos', async () => {
      await Controller.products.getProducts(request, response);

      expect(response.json.calledWith([payload])).to.be.equal(true);
    });
  });
});
