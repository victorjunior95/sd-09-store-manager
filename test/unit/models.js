const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Products = require('../../models/products');
const Sales = require('../../models/sales');

const product = { name: 'ProdutoTeste', quantity: 10 };

describe('Testando... models/products', () => {  
  before(async () => {
    const DBServer = new MongoMemoryServer();
    const connectionURL = await DBServer.getUri();

    const connectionMock = await MongoClient.connect(
      connectionURL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  it('Testando se adiciona produto com sucesso.', async () => {
    const { name, quantity } = product;
    const res = await Products.postProduct(name, quantity);

    expect(res).to.be.an('object');
    expect(res).to.have.property('_id');
    expect(res).to.have.property('name');
    expect(res).to.have.property('quantity');
  });

  it('Testando busca de todos os produtos cadastrados.', async () => {
    await Products.postProduct(product);
    const res = await Products.getAllProducts();

    expect(res).to.be.an('array');
    expect(res).to.have.length(2);
    res.forEach((e) => {
      expect(e).to.have.property('_id');
      expect(e).to.have.property('name');
      expect(e).to.have.property('quantity');
    });
  });

  it('Testando busca de produto com ID específico.', async () => {
    const id = await Products.getAllProducts().then((e) => e[0]._id);
    const res = await Products.getProductById(id);

    expect(res).to.be.an('object');
    expect(res).to.have.property('_id');
    expect(res).to.have.property('name');
    expect(res).to.have.property('quantity');
  });

  it('Testando alteração em produto cadastrado.', async () => {
    const list = await Products.getAllProducts().then((e) => e[0]);

    const {
      _id: id,
      name,
      quantity: qtd,
    } = list;

    await Products.putProduct(id, name, { quantity: 12 });
    const newQtd = await Products.getAllProducts().then((e) => e[0].quantity);

    expect(newQtd).not.to.be.equal(qtd);
    expect(newQtd).not.to.be.equal(undefined);
  });

  it('Testando excluir produto pelo ID.', async () => {
    const id = await Products.getAllProducts().then((e) => e[0]._id);
    await Products.deleteProduct(id);
    const del = await Products.getProductById(id);

    expect(del).to.be.null;
  });
});

describe('Testes para os models de sales', () => {
  before(async () => {
    const DBServer = new MongoMemoryServer();
    const connectionURL = await DBServer.getUri();

    const connectionMock = await MongoClient.connect(
      connectionURL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  it('Testando adicionar nova venda.', async () => {
    const id = await Products.postProduct(product).then((e) => e._id);
    const res = await Sales.postSales({ id, quantity: 2 });

    expect(res).to.be.an('object');
    expect(res).to.have.property('_id');
    expect(res).to.have.property('itensSold');
  });

  it('Testando recuperar todas as vendas.', async () => {
    const res = await Sales.getAllSales();
    expect(res).to.be.an('array');
    expect(res).to.have.length(1);

    res.forEach((e) => {
      expect(e).to.have.property('_id');
      expect(e).to.have.property('itensSold');
    });
  });

  it('Testando buscar venda por ID.', async () => {
    const id = await Sales.getAllSales().then((e) => e[0]._id);
    const res = await Sales.getSalesById(id);

    expect(res).to.be.an('object');
    expect(res).to.have.property('_id');
    expect(res).to.have.property('itensSold');
  });

  it('Testando excluir venda por ID', async () => {
    const id = await Sales.getAllSales().then((e) => e[0]._id);
    await Sales.deleteSales(id);
    const del = await Sales.getSalesById(id);

    expect(del).to.be.null;
  });
});
