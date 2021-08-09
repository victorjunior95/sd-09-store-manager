const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectID } = require('mongodb');

const getConnection = require('./connectionMock');
const products = require('../../models/products');
const sales = require('../../models/sales');

describe('Create a new Product', () => {
  let connectionMock;
  const product_ONE = { name: 'Product_ONE', quantity: 10 };
  const product_TWO = { name: 'Product_TWO', quantity: 10 };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('when called', () => {
    it('returns an object', () => products.create(product_ONE)
        .then((res) => expect(res).to.be.an('object')));

    it('has properties "id", "name" and "quantity"', () => products.create(product_TWO)
        .then((res) => expect(res).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Get All Products', () => {
  let connectionMock;
  const product = { name: 'Product_ONE', quantity: 10 };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('when DB is empty', () => {
    it('returns an array', () => products.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('array is empty', () => products.getAll()
      .then((res) => expect(res).to.be.empty));
  });

  describe('when DB has itens', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne(product);
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    it('returns an array', () => products.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('array is not empty', () => products.getAll()
      .then((res) => expect(res).to.not.be.empty));

    it('array has itens of type object', () => products.getAll()
      .then(([item]) => expect(item).to.be.an('object')));

    it('object has properties "id", "name" and "quantity"', () => products.getAll()
      .then(([item]) => expect(item).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Get one Product By "Id"', () => {
  let connectionMock;
  const ID_ONE = ObjectID('604cb554311d68f491ba5781');
  const ITEM_ONE_ID = { _id: ID_ONE, name: 'Product_ONE', quantity: 10 };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('when DB is empty', () => {
    it('returns null', () => products.getById()
      .then((res) => expect(res).to.be.null));
  });

  describe('when DB has itens', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne(ITEM_ONE_ID);
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    it('returns an object', () => products.getById(ID_ONE)
      .then((res) => expect(res).to.be.an('object')));

    it('object has properties "id", "name" and "quantity"', () => products.getById(ID_ONE)
      .then((res) => expect(res).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Update one Product', () => {
  let connectionMock;
  const _id = ObjectID('604cb554311d68f491ba5781');
  const ITEM_ONE = { _id, name: 'Product_ONE', quantity: 10 };
  const product = { name: 'Product_ONE', quantity: 10 };
  const newProduct = { name: 'Product_ONE', quantity: 7 };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('when called', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({ _id, product });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    it('returns an object', () => products.update(_id, product)
        .then((res) => expect(res).to.be.an('object')));

    it('has new properties "id", "name" and "quantity"', () => products.update(_id, newProduct)
        .then((res) => expect(res.modifiedCount).to.equal(1)));
  });
});

describe('Remove one Product', () => {
  let connectionMock;
  const _id = ObjectID('604cb554311d68f491ba5781');
  const product = { _id, name: 'Product_ONE', quantity: 10 };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('when called', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne(product);
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    it('expect item to be removed from DB', () => products.remove(_id)
        .then(() => products.getById(_id)
        .then((res) => expect(res).to.be.null)));
  });
});

describe('Create a new Sale', () => {
  let connectionMock;
  const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('when called', () => {
    it('returns an array', () => sales.create(itensSold)
        .then(({ itensSold }) => expect(itensSold).to.be.an('array')));

    it('has properties "id", "productId" and "quantity"', () => sales.create(itensSold)
        .then(({ itensSold: [item] }) => expect(item).to.include.all.keys('productId', 'quantity')));
  });
});

describe('Get All Sales', () => {
  let connectionMock;
  const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('when DB is empty', () => {
    it('returns an array', () => sales.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('array is empty', () => sales.getAll()
      .then((res) => expect(res).to.be.empty));
  });

  describe('when DB has itens', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('sales').insertOne({ itensSold });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    it('returns an array', () => sales.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('array is not empty', () => sales.getAll()
      .then((res) => expect(res).to.not.be.empty));

    it('array has itens of type object', () => sales.getAll()
      .then(([item]) => expect(item).to.be.an('object')));

    it('object has properties "id", "name" and "quantity"', () => sales.getAll()
      .then(([item]) => expect(item).to.include.all.keys('_id', 'itensSold')));
  });
});

describe('Get one Sale By "Id"', () => {
  let connectionMock;
  const _id = ObjectID('604cb554311d68f491ba5781');
  const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('when DB is empty', () => {
    it('returns null', () => sales.getById()
      .then((res) => expect(res).to.be.null));
  });

  describe('when DB has itens', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('sales').insertOne({ _id, itensSold });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    it('returns an object', () => sales.getById(_id)
      .then((res) => expect(res).to.be.an('object')));

    it('object has properties "id", "name" and "quantity"', () => sales.getById(_id)
      .then((res) => expect(res).to.include.all.keys('_id', 'itensSold')));
  });
});

describe('Update one Sale', () => {
  let connectionMock;
  const _id = ObjectID('604cb554311d68f491ba5781');
  const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];
  const newItens = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 1 }];

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('when called', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('sales').insertOne({ _id, itensSold });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    it('returns an object', () => sales.update(_id, itensSold)
        .then((res) => expect(res).to.be.an('object')));

    it('has new properties "id", "name" and "quantity"', () => sales.update(_id, newItens)
        .then((res) => expect(res.modifiedCount).to.equal(1)));
  });
});

describe('Remove one Sale', () => {
  let connectionMock;
  const _id = ObjectID('604cb554311d68f491ba5781');
  const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('when called', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('sales').insertOne({ _id, itensSold });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    it('expect item to be removed from DB', () => sales.remove(_id)
        .then(() => products.getById(_id)
        .then((res) => expect(res).to.be.null)));
  });
});
