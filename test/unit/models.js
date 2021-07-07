/* // ################### configurar os models e funções ####################################

const sinon = require('sinon');
const { expect } = require('chai');

const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

const mockProduct = {
  name: 'Bola de futebol',
  quantity: 100
};

const mockSales = {
  productId: ObjectId(),
  quantity: 100
}

beforeEach(async () => {

  const DBServer = new MongoMemoryServer();
  const URLMock = await DBServer.getUri();
  
  const connectionMock = await MongoClient
  .connect(URLMock, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
});

afterEach(async () => {
  MongoClient.connect.restore();
});


describe('É possivel inserir um novo produto', () => {
  it('Ao inserir um novo produto, deve retornar um objeto.', async () => {
    const response = await productsModel.insertProduct(mockProduct);
    expect(response).to.be.a('object');
  });

  it('Ao inserir um novo produto, deve retornar um objeto com as propriedades "_id, name e quantity"', async () => {
    const response = await productsModel.insertProduct(mockProduct);
    expect(response).to.have.property('_id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });

  it('Buscar todos os produtos deve retornar um array', async () => {
    await productsModel.insertProduct(mockProduct);
    const response = await productsModel.getAll();
    expect(response).to.be.a('array');
  });

  it('Buscar um produto por ID deve retornar o produto achado', async () => {
    await productsModel.insertProduct(mockProduct);
    const allProducts = await productsModel.getAll();
    const response = await productsModel.getById(allProducts[0]._id);
    expect(response).to.be.a('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });

  it('Buscar um produto por nome deve retornar o produto achado', async () => {
    await productsModel.insertProduct(mockProduct);
    const allProducts = await productsModel.getAll();
    const response = await productsModel.getByName(allProducts[0].name);

    expect(response).to.be.a('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });

  it('Atualizar um produto deve retornar o produto atualizado', async () => {
    const newProduct = {
      name: "produto atualizado",
      quantity: 5
    };

    await productsModel.insertProduct(mockProduct);
    const allProducts = await productsModel.getAll();
    await productsModel.updateProduct(
      newProduct, allProducts[0]._id);
    const response = await productsModel.getById(allProducts[0]._id);
    expect(response).to.be.a('object');
    expect(response).to.have.property('_id');
  });

  it('Ser possível deletar um produto', async () => {
    await productsModel.insertProduct(mockProduct);
    const allProducts = await productsModel.getAll();
    await productsModel.deleteById(allProducts[0]._id);
    const response = await productsModel.getById(allProducts[0]._id);
    expect(allProducts).to.be.a('array');
    expect(response).to.be.null;
  });

  it('Receber nulo ao receber id errado para deletar um produto', async () => {
    const response = await productsModel.deleteById('12331122');
    expect(response).to.be.null;
  })
});

describe('Testes do salesModel', async () => {
  it('Ao inserir um novo produto, deve retornar um objeto.', async () => {
    const response = await salesModel.insertProduct(mockSales);
    expect(response).to.be.a('object');
  });

  it('Ao inserir uma nova venda, deve retornar um objeto com as propriedades "_id, itensSold"', async () => {
    const response = await salesModel.insertProduct(mockSales);
    expect(response).to.have.property('_id');
    expect(response).to.have.property('itensSold');
  });

  it('Buscar todos os produtos deve retornar um array', async () => {
    await salesModel.insertProduct(mockSales);
    const response = await salesModel.getAll();
    expect(response).to.be.a('array');
  });
}); */