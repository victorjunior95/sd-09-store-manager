const {expect} = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const productModel = require('../../models/productModel')
const salesModel = require('../../models/salesModel')
// const productModel = {
//   create: () => {}
// };
let connectionMock;
const DBServer = new MongoMemoryServer();
const payloadProduct = {
  name: 'PS2',
  quantity: 2
};
const payloadProduct2 = {
  name: 'PS3',
  quantity: 3
};

describe('Insere um novo produto no DB', () => {


  before(async ()=> {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(async ()=> {
    // await connectionMock.close();
    MongoClient.connect.restore();
    // await DBServer.stop();
  });

  describe('quando o produto é inserido com sucesso', ()=> {
    it('retorna um id', async() => {
      const response = await productModel.create(payloadProduct);
      await productModel.deleteById(response.id)
      expect(response).to.be.a('object');
    });
  });
})

describe('Deleta um produto do DB', () => {


  before(async ()=> {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async ()=> {
    // await connectionMock.close();
    MongoClient.connect.restore();
    // await DBServer.stop();
  });

  describe('quando o produto é removido com sucesso', ()=> {
    it('retorna um objeto de status', async() => {
      const {id} = await productModel.create(payloadProduct);
      const response = await productModel.deleteById(id);
      await productModel.deleteById(id)
      expect(response).to.be.a('object');
      expect(response['deletedCount']).to.equal(1);
    });
  });
})

describe('Busca um produto do DB via ID', () => {


  before(async ()=> {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async ()=> {
    // await connectionMock.close();
    MongoClient.connect.restore();
    // await DBServer.stop();
  });

  describe('quando o produto é encontrado com sucesso', ()=> {
    it('retorna um objeto de status', async() => {
      const {id} = await productModel.create(payloadProduct);
      const response = await productModel.getById(id);
      await productModel.deleteById(id);
      expect(response).to.be.a('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });
})

describe('Busca todos os produtos da DB', () => {


  before(async ()=> {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async ()=> {
    // await connectionMock.close();
    MongoClient.connect.restore();
    // await DBServer.stop();
  });
  describe('quando nenhum produto é encontrado', () => {
    it('retorna um array vaizo', async () => {
      const response = await productModel.getAll();
      expect(response).to.be.an('array');
      expect(response.length).to.equal(0);
    })
  })
  describe('quando todos os produtos são encontrados com sucesso', ()=> {
    it('retorna um array de produtos', async() => {
      const id2 = await productModel.create(payloadProduct);
      const id1 = await productModel.create(payloadProduct2);
      const response = await productModel.getAll();
      await productModel.deleteById(id1.id);
      await productModel.deleteById(id2.id);
      expect(response).to.be.an('array');
      expect(response.length).to.equal(2);
    });
  });
})

describe('Altera um produto no DB', () => {


  before(async ()=> {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async ()=> {
    // await connectionMock.close();
    MongoClient.connect.restore();
    // await DBServer.stop();
  });

  describe('quando o produto é alterado com sucesso', ()=> {
    it('retorna um objeto', async() => {
      const {id} = await productModel.create(payloadProduct);
      const updatedProduct = await productModel.updateById(id, payloadProduct2.name, payloadProduct2.quantity);
      const response = await productModel.getById(id);
      await productModel.deleteById(id)
      expect(updatedProduct).to.be.a('object');
      expect(response.name).to.equal(updatedProduct.name);
      expect(response.quantity).to.equal(updatedProduct.quantity);
    });
  });
})


//

describe('Insere uma nova venda no DB', () => {


  before(async ()=> {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  afterEach(async ()=> {
    MongoClient.connect.restore();
    // await DBServer.stop();
  });

  describe('quando a venda é inserida com sucesso', ()=> {
    it('retorna um status de confirmação', async() => {
      const {id} = await productModel.create(payloadProduct);
      const productsArray = await productModel.getAll();
      const response = await salesModel.create(productsArray);
      const saleId = response['sales']['_id'];
      await salesModel.deleteById(saleId);
      await productModel.deleteById(id)
      expect(response).to.be.a('object');
    });
  });
})

describe('Deleta uma venda do DB', () => {


  before(async ()=> {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async ()=> {
    // await connectionMock.close();
    MongoClient.connect.restore();
    // await DBServer.stop();
  });

  describe('quando a venda é removida com sucesso', ()=> {
    it('retorna um objeto de status', async() => {
      const {id} = await productModel.create(payloadProduct);
      const productsArray = await productModel.getAll();
      const sale = await salesModel.create(productsArray);
      const saleId = sale['sales']['_id'];
      const response = await salesModel.deleteById(saleId);
      // const response = await salesModel.deleteById(id);
      await productModel.deleteById(id)
      expect(response).to.be.a('object');
      expect(response['deletedCount']).to.equal(1);
    });
  });
})

describe('Busca um produto do DB via ID', () => {


  before(async ()=> {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async ()=> {
    // await connectionMock.close();
    MongoClient.connect.restore();
    // await DBServer.stop();
  });

  describe('quando o produto é encontrado com sucesso', ()=> {
    it('retorna um objeto de status', async() => {
      const {id} = await productModel.create(payloadProduct);
      const productsArray = await productModel.getAll();
      const sale = await salesModel.create(productsArray);
      const saleId = sale['sales']['_id'];
      const response = await salesModel.getById(saleId);
      console.log('resposta',response)
      await productModel.deleteById(id);
      await salesModel.deleteById(saleId)
      expect(response).to.be.a('object');
      expect(response).to.have.property('_id');
      expect(response).to.have.property('itensSold');
    });
  });
})

describe('Busca todos os produtos da DB', () => {


  before(async ()=> {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async ()=> {
    // await connectionMock.close();
    MongoClient.connect.restore();
    // await DBServer.stop();
  });
  describe('quando nenhum produto é encontrado', () => {
    it('retorna um array vaizo', async () => {
      const response = await salesModel.getAll();
      console.log(response)
      expect(response).to.be.an('array');
      expect(response.length).to.equal(0);
    })
  })
});
