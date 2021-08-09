const Sinon = require('sinon');
const { expect } = require('chai');
const { saleModel, productModel } = require('../../models');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
describe('Sale Model', async () => {
  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    Sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  it('save', async () => {
    const itens = [{ quantity: 1, productId: 1 }];
    const createdSale = await saleModel.save(itens);
    expect(createdSale.itensSold).to.length(1);
  });

  it('findAll', async () => {
    const result = await saleModel.findAll();
    expect(result).to.be.length(1);
  });

  it('findOne', async () => {
    const result = await saleModel.findById('abc');
    expect(result).to.be.undefined;
    const result2 = await saleModel.findById(1);
    expect(result2).to.be.null;
  });

  it('remove', async () => {
    const result = await saleModel.remove(1);
    expect(result).to.true;
  });

  it('update', async () => {
    const result = await saleModel.update({ id: 1, productId: 1, quantity: 1 });
    expect(result).to.true;
  });
});

describe('Sale Model', async () => {
  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    Sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  it('save', async () => {
    const createdProduct = await productModel.save({ name: 'produto 1', quantity: 2 });
    expect(createdProduct).to.be.a('object');
  });

  it('findByName', async () => {
    const product = await productModel.findByName('produto 1');
    expect(product).to.be.a('object');
  });

  it('findAll', async () => {
    const product = await productModel.findAll();
    expect(product).to.be.a('array');
  });

  it('findById', async () => {
    const product = await productModel.findById('abc');
    expect(product).to.be.undefined;

    const product2 = await productModel.findById(1);
    expect(product2).to.be.null;
  });

  it('update', async () => {
    const product = await productModel.update({ id: 1, name: 'KKK', quantity: 2 });
    expect(product).to.be.a('object');
  });

  it('remove', async () => {
    const product = await productModel.remove(1);
    expect(product).to.be.true;
  });

  it('updateQuantity', async () => {
    const product = await productModel.updateQuantity(1, 2);
    expect(product).to.be.null;
  });
});
