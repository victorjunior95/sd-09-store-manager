const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { productsService } = require('../../services');
const { InvalidArgumentError } = require('../../errors');
const { MongoClient } = require('mongodb');
const connect = require('../mocks/connection');
const { describe } = require('mocha');

// Setando chai para teste assíncrono
// Issue no Github: https://github.com/chaijs/chai/issues/415
// Obgd, nato <3
chai.use(chaiAsPromised);
const expect = chai.expect;

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'products';
let connectionMock;

describe('Create a new product (service)', () => {
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

  describe('when a invalid payload is provided', () => {
    describe('when a invalid name is provided', () => {
      it('should throw a InvalidArgumentError if it has below 5 letters', async () => {
        const invalidNamePayload = {
          name: 'doce', quantity: 8000,
        }

        return expect(
          productsService.create(invalidNamePayload)
        ).to.be.rejectedWith(
          InvalidArgumentError,
          '"name" length must be at least 5 characters long',
        );
      });

      it('should throw an InvalidArgumentError if it has a repeated name', async () => {
        const repeatedPayload = { name: 'candy', quantity: 8000 };

        await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).insertOne(repeatedPayload);

        expect(
          productsService.create(repeatedPayload)
        ).to.be.rejectedWith(
          InvalidArgumentError,
          'Product already exists',
        );
      });
    });

    describe('when a invalid quantity is provided', () => {
      it('should throw an InvalidArgumentError if a negative number is provided', async () => {
        const invalidQuantityPayload = {
          name: 'candy', quantity: -5,
        };

        expect(
          productsService.create(invalidQuantityPayload)
        ).to.be.rejectedWith(
          InvalidArgumentError,
          '"quantity" must be larger than or equal to 1',
        );
      });

      it('should throw an InvalidArgumentError if zero is provided', async () => {
        const invalidQuantityPayload = {
          name: 'candy', quantity: 0,
        };

        expect(
          productsService.create(invalidQuantityPayload)
        ).to.be.rejectedWith(InvalidArgumentError);
      });

      it('should throw an InvalidArgumentError if a string is provided', async () => {
        const invalidQuantityPayload = {
          name: 'candy', quantity: 'string',
        };

        expect(
          productsService.create(invalidQuantityPayload)
        ).to.be.rejectedWith(
          InvalidArgumentError,
          '"quantity" must be larger than or equal to 1',
        );
      });
    });
  });

  describe('when a valid payload is provided', () => {
    afterEach(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});
    });

    it('should return an object', async () => {
      const validPayload = {
        name: 'candy', quantity: 8000,
      };
      const response = await productsService.create(validPayload);

      expect(response).to.be.an('object');
    });

    it('should return an object with the keys _id, name and quantity', async () => {
      const validPayload = {
        name: 'candy', quantity: 8000,
      };
      const response = await productsService.create(validPayload);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
  });
});

describe('List all products (service)', () => {
  const productsList = [
    { name: 'candy', quantity: 8000 },
    { name: 'eraser', quantity: 500 },
  ];

  before(async () => {
    connectionMock = await connect();

    sinon.stub(MongoClient, 'connect')
    .resolves(connectionMock);

    connectionMock.db(DB_NAME).collection(COLLECTION_NAME).insertMany(productsList);
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});

    MongoClient.connect.restore();
  });

  it('should return an object', async () => {
    const response = await productsService.getAll();

    expect(response).to.be.an('object');
  });

  it('should return an object with the key products', async () => {
    const response = await productsService.getAll();

    expect(response).to.include.all.keys('products');
  });

  it('should return an object which the keys "products" contains an array', async () => {
    const response = await productsService.getAll();

    expect(response.products).to.be.an('array');
  });

  it('should return an object which the elements the array of products are an object', async () => {
    const response = await productsService.getAll();
    const [item] = response.products;

    expect(item).to.be.an('object');
  });

  it('each object must contain the keys _id, name and quantity', async () => {
    const response = await productsService.getAll();
    const [item] = response.products;

    expect(item).to.include.all.keys('_id', 'name', 'quantity');
  });
});
