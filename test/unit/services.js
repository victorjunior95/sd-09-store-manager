const sinon = require('sinon');
const { expect } = require('chai');

const Model = require('../../models');
const Service = require('../../services');

describe('Cadastro de um novo produto', () => {
  describe('com dados válidos', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before(async () => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(Model.products, 'addProduct').resolves({ _id: ID_EXAMPLE, ...payload });
    });

    after(() => {
      Model.products.addProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Service.products.addProduct(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto', async () => {
      const response = await Service.products.addProduct(payload);

      expect(response).to.have.a.property('_id');
    });
  });

  describe('com "name" curto demais', () => {
    const payload = { name: '', quantity: 30 };

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.addProduct(payload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.addProduct(payload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('com uma string no campo "quantity"', () => {
    const payload = { name: 'Testy, the Tester', quantity: 'trinta' };

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.addProduct(payload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.addProduct(payload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('"quantity" must be a number');
    });
  });

  describe('com um numero menor que 1 no campo "quantity"', () => {
    const payload = { name: 'Testy, the Tester', quantity: 0 };

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.addProduct(payload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.addProduct(payload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('"quantity" must be larger than or equal to 1');
    });
  });
});
