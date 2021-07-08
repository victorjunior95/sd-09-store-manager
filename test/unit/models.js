const sinon = require('sinon');
const { expect } = require('chai');

const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

// product model functions
const {
  getAll,
  insertProduct,
  deleteProduct,
  getbyname,
  getbyid,
  update,
} = require('../../models/productModel');

// sales model functions
const {
  allsale,
  newsale,
  deletesale,
  getsaleby,
  updatesale,
  decrementpdt,
  incrementpdt,
  oneprodu,
} = require('../../models/salesModel');

const mockProduct = {
  name: 'livro',
  quantity: 10
};

const mockSales = [{
  productId: ObjectId(),
  quantity: 10
}]

beforeEach(async () => {

  const DBServer = new MongoMemoryServer();
  const URLMocked = await DBServer.getUri();
  
  const connectionMocked = await MongoClient
  .connect(URLMocked, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  sinon.stub(MongoClient, 'connect').resolves(connectionMocked);
});

afterEach(async () => {
  MongoClient.connect.restore();
});


describe('É possivel inserir um produto Model/Products', () => {
  it('retorna um objeto com o produto inserido.', async () => {
    const {name, quantity} = mockProduct;
    const response = await insertProduct(name,quantity);
    expect(response).to.be.a('object');
  });

  it('O objeto contem as propriedades "_id", "name" e "quantity"', async () => {
    const {name, quantity} = mockProduct;
    const response = await insertProduct(name,quantity);
    expect(response).to.have.property('_id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });

  it('Buscar tudo deve retorna um array', async () => {
    const {name, quantity} = mockProduct;
    await insertProduct(name,quantity);
    const response = await getAll();
    expect(response).to.be.a('array');
  });

  
});