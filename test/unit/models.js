const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { describe } = require('mocha');
const { Product } = require('../../models');
const { InvalidArgumentError } = require('../../errors');
const { MongoClient } = require('mongodb');
const connect = require('../mocks/connection');

chai.use(chaiAsPromised);
const expect = chai.expect;

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'products';

describe('Creation of a new product (model)', () => {
  // Link da reply do StackOverflow que salvou minha vida
  // Com o MongoMemoryServer https://stackoverflow.com/a/63675768
  const product = new Product();
  const payload = {
    name: 'candy', quantity: 8000,
  };
  let connectionMock;


  before(async () => {
    connectionMock = await connect();

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);
  });

  afterEach(async () => {
    await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Successful insertion', () => {
    it('should call the function create', () => {
      expect(product.create).to.be.a('function');
    });

    it('should return an object', async () => {
      const response = await product.create(payload);

      expect(response).to.be.an('object');
    });

    it('the object must containd the keys _id, name and quantity', async () => {
      const response = await product.create(payload);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    })
  });
});

describe('List all the products (model)', () => {
  const product = new Product();
  let connectionMock;


  before(async () => {
    connectionMock = await connect();

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When there is no products registered', () => {
    it('should call the function getAll', () => {
      expect(product.getAll).to.be.a('function');
    });

    it('should return a list of products', async () => {
      const response = await product.getAll();

      expect(response).to.be.an('array');
    });

    it('should return an empty list', async () => {
      const response = await product.getAll();

      expect(response).to.be.empty;
    });
  });

  describe('When there is at least one product registered', () => {
    beforeEach(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).insertOne({
        name: 'candy',
        quantity: 8000,
      });
    });

    afterEach(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});
    })

    it('should call the function getAll', () => {
      expect(product.getAll).to.be.a('function');
    });

    it('should return a list of products', async () => {
      const response = await product.getAll();

      expect(response).to.be.an('array');
    });

    it('should return a non empty list', async () => {
      const response = await product.getAll();

      expect(response).not.to.be.empty;
    });

    it('should return a list of objects', async () => {
      const [item] = await product.getAll();

      expect(item).to.be.an('object');
    });

    it('its objects should have the keys _id, name and quantity', async () => {
      const [item] = await product.getAll();

      expect(item).to.include.all.keys('_id', 'name', 'quantity');
    })
  })
});

describe('List a product by its ID (model)', () => {
  const product = new Product();
  let connectionMock;

  before(async () => {
    connectionMock = await connect();

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);
  });

  afterEach(async () => {
    await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('when a valid _id is provided', () => {
    it('should return a object', async () => {
      const { _id: id } = await product.create({ name: 'candy', quantity: 8000 });

      const response = await product.get(id);

      expect(response).to.be.an('object');
    });

    it('should return a object with the keys _id, name and quantity', async () => {
      const { _id: id } = await product.create({ name: 'candy', quantity: 8000 });

      const response = await product.get(id);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
  });

  describe('when an invalid _id is provided', () => {
    it('should throw an InvalidArgumentError', async () => {
      const { _id: id } = await product.create({ name: 'candy', quantity: 8000 });

      const invalidID = id.toString().replace('0', 'o');

      expect(
        product.get(invalidID)
      ).to.be.rejectedWith(
        InvalidArgumentError,
        'Wrogn id format',
      )
    });
  });
});
