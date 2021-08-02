const sinon = require('sinon');
const { expect } = require('chai');

const Model = require('../../models');
const Service = require('../../services');

describe('Cadastro de um novo produto', () => {
  describe('com dados válidos', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before(() => {
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

  describe('com um produto que já está cadastrado', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before(() => {
      sinon.stub(Model.products, 'getProductByName').resolves(true);
    });

    after(() => {
      Model.products.getProductByName.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.addProduct(payload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.addProduct(payload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('Product already exists');
    });
  });
});

describe('Carrega a lista de produtos', () => {
  describe('quando não tem nenhum cadastrado',() => {
    before(() => {
      sinon.stub(Model.products, 'getProducts').resolves([]);
    });

    after(() => {
      Model.products.getProducts.restore();
    });

    it('retorna um array', async () => {
      const response = await Model.products.getProducts();

      expect(response).to.be.an('array');
    });

    it('vazio', async () => {
      const response = await Model.products.getProducts();

      expect(response).to.be.empty;
    });
  });

  describe('quando tem produtos cadastrados', () => {
    before(() => {
      const payload = { name: 'Testy, the Tester', quantity: 30 };

      sinon.stub(Model.products, 'getProducts').resolves([payload]);
    });

    after(() => {
      Model.products.getProducts.restore();
    });

    it('retorna um array', async () => {
      const response = await Model.products.getProducts();

      expect(response).to.be.an('array');
    });

    it('de objetos', async () => {
      const [ item ] = await Model.products.getProducts();

      expect(item).to.be.an('object');
    });
  });
});

describe('Carrega um produto cadastrado pela "_id"', () => {
  const ID_EXAMPLE = '604cb554311d68f491ba5781';

  describe('quando não encontrado', () => {
    before(() => {
      sinon.stub(Model.products, 'getProductById').resolves(null);
    });

    after(() => {
      Model.products.getProductById.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.getProductById(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.getProductById(ID_EXAMPLE);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('Wrong id format');
    });
  });

  describe('quando encontrado', () => {
    before(() => {
      const payload = { name: 'Testy, the Tester', quantity: 30 };

      sinon.stub(Model.products, 'getProductById').resolves(payload);
    });

    after(() => {
      Model.products.getProductById.restore();
    });

    it('o retorno é um objeto, com as informações do produto', async () => {
      const response = await Service.products.getProductById(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response).to.have.property('name');

      expect(response).to.have.property('quantity');
    });
  });
});
