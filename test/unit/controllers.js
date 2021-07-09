const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const { productsController } = require('../../controllers');
const { productsService } = require('../../services');
const { errorTreatment } = require('../../middlewares');
const { InvalidArgumentError } = require('../../errors');
const { MongoClient } = require('mongodb');
const connect = require('../mocks/connection');

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'products';
let connectionMock;

describe('Create a new product (controller)', () => {
  const validBody = { name: 'candy', quantity: 8000 };
  const response = {};
  const request = {};
  let next;

  before(async () => {
    connectionMock = await connect();

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});

    MongoClient.connect.restore();
  });

  describe('When a valid payload is provided', () => {
    const successfulResponse = { ...validBody, _id: "sdfjh233345kj3j2b" };

    before(() => {
      request.body = validBody;
      next = sinon.stub().callsFake(() => {})

      sinon.stub(productsService, 'create')
        .resolves(successfulResponse);
    });

    after(() => {
      productsService.create.restore();
    });

    it('should return a status code 201', async () => {
      await productsController.create(request, response, next);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('should return an object with the product info', async () => {
      await productsController.create(request, response, next);

      expect(response.json.calledWith(successfulResponse)).to.be.equal(true);
    });
  });

  describe('When a invalid payload is provided', () => {
    describe('When a invalid name with less than 5 digits provided', () => {
      before(() => {
        request.body = { name: 'doce', quantity: 8000 };

        sinon.stub(productsService, 'create')
          .rejects(new InvalidArgumentError('"name" length must be at least 5 characters long'));
      });

      after(() => {
        productsService.create.restore();
      });

      it('should return a status code 422', async () => {
        await productsController.create(request, response);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        const expectedResponse = {
          err: {
            code: 'invalid_data',
            message: '"name" length must be at least 5 characters long',
          }
        };

        await productsController.create(request, response);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('When a repeated name is provided', async () => {
      before(async () => {
        request.body = validBody;

        sinon.stub(productsService, 'create')
          .rejects(new InvalidArgumentError('Product already exists'));
      });

      after(() => {
        productsService.create.restore();
      });

      it('should return a status code 422', async () => {
        await productsController.create(request, response);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        const expectedResponse = {
          err: {
            code: 'invalid_data',
            message: 'Product already exists',
          },
        };

        await productsController.create(request, response);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('when a negative quantity is provided', () => {
      before(() => {
        request.body = { name: 'candy', quantity: -5 };

        sinon.stub(productsService, 'create')
          .rejects(new InvalidArgumentError('"quantity" must be larger than or equal to 1'));
      });

      after(() => {
        productsService.create.restore();
      });

      it('should return a status code 422', async () => {
        await productsController.create(request, response);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an objec with the following properties', async () => {
        const expectedResponse = {
          err: {
            code: 'invalid_data',
            message: '"quantity" must be larger than or equal to 1',
          },
        };

        await productsController.create(request, response);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('when the vaue zero is provided to quantity', async () => {
      before(() => {
        request.body = { name: 'candy', quantity: 0 };

        sinon.stub(productsService, 'create')
          .rejects(new InvalidArgumentError('"quantity" must be larger than or equal to 1'));
      });

      after(() => {
        productsService.create.restore();
      });

      it('should return a status code 422', async () => {
        await productsController.create(request, response);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return as objects with the following properties', async () => {
        const expectedResponse = {
          err: {
            code: 'invalid_data',
            message: '"quantity" must be larger than or equal to 1',
          },
        }

        await productsController.create(request, response);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('When a string is provided to quantity', async () => {
      before(() => {
        request.body = { name: 'candy', quantity: 'abc' };

        sinon.stub(productsService, 'create')
          .rejects(new InvalidArgumentError('"quantity" must be a number'));
      });

      after(() => {
        productsService.create.restore();
      });

      it('should return a status code 422', async () => {
        await productsController.create(request, response);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        const expectedResponse = {
          err: {
            code: 'invalid_data',
            message: '"quantity" must be a number',
          }
        };

        await productsController.create(request, response);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });
  });
});

describe('List all products (controller)', () => {
  const productsList = [
    { name: 'candy', quantity: 8000 },
    { name: 'eraser', quantity: 500 },
  ];
  const sandbox = sinon.createSandbox();
  const request = {};
  const response = {};

  before(async () => {
    connectionMock = await connect();

    connectionMock.db(DB_NAME).collection(COLLECTION_NAME).insertMany(productsList);

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sandbox.stub(MongoClient, 'connect')
      .resolves(connectionMock);
    sandbox.stub(productsService, 'getAll')
      .resolves({ products: productsList});
  });

  after(() => {
    connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});

    sandbox.restore();
  });

  it('should return a status code 200', async () => {
    await productsController.getAll(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('should return an response with the following structure', async () => {
    await productsController.getAll(request, response);
    const products = await connectionMock.db(DB_NAME)
      .collection(COLLECTION_NAME).find().toArray();

    expect(response.json.calledWith({ products })).to.be.equal(true);
  });
});

describe('List a product by its ID (controller)', () => {
  const product = { _id: 'sdf9s7f9s89d7f8s', name: 'candy', quantity: 8000 };
  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe('when a valid id is provided', () => {
    before(() => {
      request.params = { id: product._id }

      sinon.stub(productsService, 'get')
        .resolves(product);
    });

    after(() => {
      productsService.get.restore();
    });

    it('should return a status code 200', async () => {
      await productsController.get(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('should return the product with the respective id', async () => {
      await productsController.get(request, response);

      expect(response.json.calledWith(product)).to.be.equal(true);
    });
  });

  describe('when an invalid id is provided', () => {
    before(() => {
      request.params = { id: 'abcdefg' };

      sinon.stub(productsService, 'get')
        .rejects(new InvalidArgumentError('Wrong id format'));
    });

    after(() => {
      productsService.get.restore();
    });

    it('should return a status code 422', async () => {
      await productsController.get(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('should return an object with the following properties', async () => {
      const errorResponse = {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        }
      };

      await productsController.get(request, response);

      expect(response.json.calledWith(errorResponse)).to.be.equal(true);
    });
  });
});
