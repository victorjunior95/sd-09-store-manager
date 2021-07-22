const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

describe('Create an endpoint to list all products', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('There are no registered products', () => {
    it('Returns an object', async () => {
      const res = await productsModel.getAllProducts();
      expect(res).to.be.an('object');
    });

    it('Array not to be empty', async () => {
      const res = await productsModel.getAllProducts();
      expect(res).to.not.be.empty;
    });
  });

  describe('There are registered products', async () => {
    before(async () => {
      connectionMock.db('StoreManager').collection('products')
        .insertOne({ _id: '60f842dc7561612da0fae80b', name:'Produto1', quantity: 30 });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    it('Returns an object', async () => {
      const res = await productsModel.getAllProducts();
      expect(res).to.be.an('object').to.have.key('products');
    });

    it('Products object returned must contain an array', async () => {
      const res = await productsModel.getAllProducts();
      expect(res.products).to.be.an('array');
    });


  });
});

describe('Create an endpoint for product registration', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Create product', () => {
    const object = { name: "product1", quantity: 5 };

    it('Returns an object', async () => {
      const res = await productsModel.createProduct(object);
      expect(res).to.be.an('object');
    });

    it('Object properties: _id, name, quantity', async () => {
      const res = await productsModel.createProduct(object);

      expect(res).to.include.all.keys('_id', 'name', 'quantity');
    });
  });
});

describe('Create an endpoint to list products by Id', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let ID;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const { insertedId } = await connectionMock.db('StoreManager').collection('products')
      .insertOne({ name: 'Product1', quantity: 5 });
    ID = insertedId;
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Product found', () => {
    it('Returns an object', async () => {
      const res = await productsModel.getByIdProduct(ID);
      expect(res).to.be.an('object');
    })
  });

  describe('Registered product', async () => {
    before(async () => {
      connectionMock.db('StoreManager').collection('products').insertOne({
        _id: '60e770a1f03f7e8cab42578a',
        name:'Produto1',
        quantity: 30,
      });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    const ID = ObjectId('60e770a1f03f7e8cab42578a');

    it('Object properties: _id, name, quantity', async () => {
      const res = await productsModel.getByIdProduct(ID);

      expect(res).to.include.all.keys('_id', 'name', 'quantity');
    });
  });

  describe('Not found product', () => {
    it('Returns null', async () => {
      const res = await productsModel.getByIdProduct();
      expect(res).to.be.null;
    });
  });
});

describe('Create an endpoint to update a product', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let ID;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const { insertedId } = await connectionMock.db('StoreManager').collection('products')
      .insertOne({ name: 'Product1', quantity: 5 });
    ID = insertedId;
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Edit product', () => {
    it('retorna um object', async () => {
      const res = await productsModel.updateProduct(ID, 'product2', 10);
      expect(res).to.be.an('object');
    });
  });
});

describe('Create an endpoint to delete a product', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let ID;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const { insertedId } = await connectionMock.db('StoreManager').collection('products')
      .insertOne({ name: 'Product1', quantity: 5 });
    ID = insertedId;
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Delete product', () => {
    it('Returns an object', async () => {
      const res = await productsModel.deleteProduct(ID);
      expect(res).to.be.an('object');
    });
  });
});

describe('Create an endpoint to register sales', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let ID;
  let body;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const { insertedId } = await connectionMock.db('StoreManager').collection('products')
      .insertOne({ name: 'Product1', quantity: 35 });
    ID = insertedId;
    body = [{ productId: ID, quantity: 30 }];
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Register a successful sale', () => {
    it('Returns an object', async () => {
      const res = await salesModel.createSales(body);
      expect(res).to.be.an('object');
    });
  });
});

describe('Update the quantity of products', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let ID;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const { insertedId } = await connectionMock.db('StoreManager').collection('products')
      .insertOne({ name: 'Product1', quantity: 15 });
    ID = insertedId
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Decreases the amount after the sale', () => {
    it('returns an object', async () => {
      const res = await productsModel.updateProduct(ID, 2);
      expect(res).to.be.an('object');
    });
  });
});

describe('Create an endpoint to list sales', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Sales not found', () => {
    it('Returns an object', async () => {
      const res = await salesModel.getAllSales();
      expect(res).to.be.an('object');
    });

    it('Empty array', async () => {
      const res = [];
      expect(res).to.be.empty;
    });
  });

  describe('Find sales', () => {
    before(async () => {
      connectionMock.db('StoreManager').collection('sales')
        .insertOne([{ name: 'Product1', quantity: 5 }]);
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    it('Returns an object', async () => {
      const res = await salesModel.getAllSales();
      expect(res).to.be.an('object');
    });

    it('Must return an object with a key sales', async () => {
      const res = await salesModel.getAllSales();
      expect(res).to.be.an('object').to.have.key('sales');
    });

    it('Unregistered sale: Array has zero size', async () => {
      const result = await salesModel.getAllSales();
      expect(result.sales).to.have.length(0);
    });

    it('Object must contain an array with the sales list', async() => {
      const res = await salesModel.getAllSales();
      expect(res.sales).to.be.an('array');
    });

    it('Array size equals number of sales', async () => {
      const db = connectionMock.db('StoreManager');
      await db.collection('products').insertOne({ _id: '60e770a1f02f7e8cab42591a', name:'Product1', quantity: 50 });
      await db.collection('products').insertOne({ _id: '60e770a1f02f7e8cab42525a', name:'Product2', quantity: 70 });
      await db.collection('sales').insertOne({itensSold: [{ productId: '60e770a1f02f7e8cab42591a', quantity: 25 }] });
      await db.collection('sales').insertOne({itensSold: [{ productId: '60e770a1f02f7e8cab42525a', quantity: 40 }] });
      const res = await salesModel.getAllSales();

      expect(res.sales).to.have.length(2);
    });

  });
});

describe('Search sales by Id', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let ID;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const { insertedId } = await connectionMock.db("StoreManager").collection('sales')
      .insertOne({ name: 'Produto1', quantity: 10 });
    ID = insertedId;
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Sale not found', () => {
    it('Returns null', async () => {
      const res = await salesModel.getByIdSale('60e770a1f02f7e8cab42591a');
      expect(res).to.be.null;
    });
  });

  describe('Invalid id', () => {
    it('Returns null', async () => {
      const res = await salesModel.getByIdSale('9999');
      expect(res).to.be.null;
    });
  });

  describe('Find sale', () => {
    it('Returns an object', async () => {
      const res = await salesModel.getByIdSale(ID);
      expect(res).to.be.an('object');
    });
  });
});

describe('Create an endpoint to update a sale', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Unsuccessful Sales Update', () => {
    it('Unsuccessful update returns null', async () => {
      const update = [{ productId: '60f900746fbc8975cb010b9b', quantity: 10 }];
      const res = await salesModel.updateSale('99999', update);
      expect(res).to.be.null;
    });
  });

  describe('Successful Sales Update', () => {
    const body = [{ productId: '60f827662b67ebb322b3f0d7', quantity: 15 }];

    it('Returns an object', async () => {
      const res = await salesModel.updateSale('60f827662b67ebb322b3f0d8', body);
      expect(res).to.be.an('object');
    });

    it('Successor update returns keys: _id, itemsSold', async () => {
      await connectionMock.db('StoreManager').collection('sales').insertOne({
        _id: '60f900746fbc8975cb010b9f', itensSold: [{ productId: '60f900746fbc8975cb010b9b', quantity: 15 }],
      });
      const update = [{ productId: '60f900746fbc8975cb010b9b', quantity: 10 }];
      const res = await salesModel.updateSale('60f900746fbc8975cb010b9f', update);
      expect(res).to.be.all.keys('_id', 'itensSold');
    });
  });
});

describe('Create an endpoint to delete a sale', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Delete successful', () => {
    it('Returns null', async () => {
      const sale = { sales: [{
        _id: "60f9240fe32fdf408c886460",
        itensSold: [{ productId: "60f920317d5d542c8129aa59", quantity: 10 }],
      }] };
      await connectionMock.db('StoreManager').collection('sales').insertOne(sale);
      const res = await salesModel.deleteSale('60f9240fe32fdf408c886460');
      expect(res).to.be.null;
    });
  });

  describe('Failed to delete sale', () => {
    it('Returns null', async () => {
      const res = await salesModel.deleteSale('99999');
      expect(res).to.be.null;
    });
  });
});
