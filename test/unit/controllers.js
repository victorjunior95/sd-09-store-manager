const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const { productsController } = require('../../controllers');
const { productsService } = require('../../services');
const { InvalidArgumentError, NotFoundError } = require('../../errors');
const { MongoClient } = require('mongodb');
const connect = require('../mocks/connection');

const sandbox = sinon.createSandbox();
const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'products';
const response = {};
const request = {};
let connectionMock;
let next;

describe('Create a new product (controller)', () => {
  const validBody = { name: 'candy', quantity: 8000 };

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
      next = sandbox.stub().callsFake(() => {});

      sandbox.stub(productsService, 'create')
        .resolves(successfulResponse);
    });

    after(() => {
      sandbox.restore();
    });

    it('should never call the function next', async () => {
      await productsController.create(request,response, next);

      expect(next.neverCalledWith()).to.be.equal(true);
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
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        }
      };
      const expectedError = new InvalidArgumentError('"name" length must be at least 5 characters long');

      before(() => {
        request.body = { name: 'doce', quantity: 8000 };

        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'create')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.create(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.create(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await productsController.create(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('When a repeated name is provided', async () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      };
      const expectedError = new InvalidArgumentError('Product already exists');

      before(async () => {
        request.body = validBody;
        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'create')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.create(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.create(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await productsController.create(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('when a negative quantity is provided', () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      };
      const expectedError = new InvalidArgumentError('"quantity" must be larger than or equal to 1');

      before(() => {
        request.body = { name: 'candy', quantity: -5 };
        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'create')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.create(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.create(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an objec with the following properties', async () => {
        await productsController.create(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('when the vaue zero is provided to quantity', async () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      };
      const expectedError = new InvalidArgumentError('"quantity" must be larger than or equal to 1');

      before(() => {
        request.body = { name: 'candy', quantity: 0 };
        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'create')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.create(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.create(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return as objects with the following properties', async () => {
        await productsController.create(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('When a string is provided to quantity', async () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        }
      };
      const expectedError = new InvalidArgumentError('"quantity" must be a number');

      before(() => {
        request.body = { name: 'candy', quantity: 'abc' };
        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'create')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.create(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.create(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await productsController.create(request, response, next);

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
  let next;

  before(async () => {
    connectionMock = await connect();

    connectionMock.db(DB_NAME).collection(COLLECTION_NAME).insertMany(productsList);

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sandbox.stub().callsFake(() => {});

    sandbox.stub(MongoClient, 'connect')
      .resolves(connectionMock);
    sandbox.stub(productsService, 'getAll')
      .resolves({ products: productsList});
  });

  after(() => {
    connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});

    sandbox.restore();
  });

  it('should not call the function next', async () => {
    await productsController.getAll(request, response, next);

    expect(next.neverCalledWith()).to.be.equal(true);
  });

  it('should return a status code 200', async () => {
    await productsController.getAll(request, response, next);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('should return an response with the following structure', async () => {
    await productsController.getAll(request, response, next);
    const products = await connectionMock.db(DB_NAME)
      .collection(COLLECTION_NAME).find().toArray();

    expect(response.json.calledWith({ products })).to.be.equal(true);
  });
});

describe('List a product by its ID (controller)', () => {
  const product = { _id: 'sdf9s7f9s89d7f8s', name: 'candy', quantity: 8000 };
  const expectedResponse = {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  };
  const expectedError = new InvalidArgumentError('Wrong id format');
  const response = {};
  const request = {};
  let next;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe('when a valid id is provided', () => {
    before(() => {
      request.params = { id: product._id };
      next = sandbox.stub().callsFake(() => {});

      sandbox.stub(productsService, 'get')
        .resolves(product);
    });

    after(() => {
      sandbox.restore();
    });

    it('should never cal  the funciton next', async () => {
      await productsController.get(request, response, next);

      expect(next.neverCalledWith()).to.be.equal(true);
    });

    it('should return a status code 200', async () => {
      await productsController.get(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('should return the product with the respective id', async () => {
      await productsController.get(request, response, next);

      expect(response.json.calledWith(product)).to.be.equal(true);
    });
  });

  describe('when an invalid id is provided', () => {
    before(() => {
      request.params = { id: 'abcdefg' };
      next = sandbox.stub().callsFake((error) => {
        return error.constructor === InvalidArgumentError
          ? response.status(422).json(expectedResponse)
          : null;
      });

      sandbox.stub(productsService, 'get')
        .rejects(expectedError);
    });

    after(() => {
      sandbox.restore();
    });

    it('should call the function next', async () => {
      await productsController.get(request, response, next);

      expect(next.calledWith(expectedError)).to.be.equal(true);
    });

    it('should return a status code 422', async () => {
      await productsController.get(request, response, next);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('should return an object with the following properties', async () => {
      await productsController.get(request, response, next);

      expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
    });
  });
});

describe('Update a product (controller)', () => {
  const validBody = { name: 'candy', quantity: 8000 };
  const id = '60e8a400c7520a3aa88a8789';

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
    const successfulResponse = { ...validBody, _id: id };

    before(() => {
      request.body = validBody;
      request.params = { id };
      next = sandbox.stub().callsFake(() => {});

      sandbox.stub(productsService, 'update')
        .resolves(successfulResponse);
    });

    after(() => {
      sandbox.restore();
    });

    it('should never call the function next', async () => {
      await productsController.update(request,response, next);

      expect(next.neverCalledWith()).to.be.equal(true);
    });

    it('should return a status code 201', async () => {
      await productsController.update(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('should return an object with the product info', async () => {
      await productsController.update(request, response, next);

      expect(response.json.calledWith(successfulResponse)).to.be.equal(true);
    });
  });

  describe('When a invalid payload is provided', () => {
    describe('When a invalid name with less than 5 digits provided', () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        }
      };
      const expectedError = new InvalidArgumentError('"name" length must be at least 5 characters long');

      before(() => {
        request.body = { name: 'doce', quantity: 8000 };
        request.params.id = id;

        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'update')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.update(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.update(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await productsController.update(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('When a repeated name is provided', async () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      };
      const expectedError = new InvalidArgumentError('Product already exists');

      before(async () => {
        request.body = validBody;
        request.params = { id };

        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'update')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.update(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.update(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await productsController.update(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('when a negative quantity is provided', () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      };
      const expectedError = new InvalidArgumentError('"quantity" must be larger than or equal to 1');

      before(() => {
        request.body = { name: 'candy', quantity: -5 };
        request.params = { id };

        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'update')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.update(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.update(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an objec with the following properties', async () => {
        await productsController.update(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('when the vaue zero is provided to quantity', async () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      };
      const expectedError = new InvalidArgumentError('"quantity" must be larger than or equal to 1');

      before(() => {
        request.body = { name: 'candy', quantity: 0 };
        request.params = { id };

        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'update')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.update(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.update(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return as objects with the following properties', async () => {
        await productsController.update(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('When a string is provided to quantity', async () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        }
      };
      const expectedError = new InvalidArgumentError('"quantity" must be a number');

      before(() => {
        request.body = { name: 'candy', quantity: 'abc' };
        request.params.id = id;

        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'update')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.update(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.update(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await productsController.update(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('when an invalid id is provided', () => {
      const expectedResponse = {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        }
      };
      const expectedError = new InvalidArgumentError('Wrong id format');

      before(() => {
        request.params = { id: 'abcdefg' };
        request.params = { id };

        next = sandbox.stub().callsFake((error) => {
          return error.constructor === InvalidArgumentError
            ? response.status(422).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'update')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.update(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.update(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await productsController.update(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });

    describe('when an unregistered id is provided', () => {
      const expectedResponse = {
        err: {
          code: 'not_found',
          message: 'Entity "product" not found',
        }
      };
      const expectedError = new NotFoundError('Entity "product" not found');

      before(() => {
        request.params = { id };

        next = sandbox.stub().callsFake((error) => {
          return error.constructor === NotFoundError
            ? response.status(404).json(expectedResponse)
            : null;
        });

        sandbox.stub(productsService, 'update')
          .rejects(expectedError);
      });

      after(() => {
        sandbox.restore();
      });

      it('should call the function next', async () => {
        await productsController.update(request, response, next);

        expect(next.calledWith(expectedError)).to.be.equal(true);
      });

      it('should return a status code 422', async () => {
        await productsController.update(request, response, next);

        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('should return an object with the following properties', async () => {
        await productsController.update(request, response, next);

        expect(response.json.calledWith(expectedResponse)).to.be.equal(true);
      });
    });
  });
});
