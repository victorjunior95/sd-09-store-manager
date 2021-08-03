const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, Db } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { ObjectId } = require('mongodb');

const productsModel = require('../../models/products.model');
const salesModel = require('../../models/sales.model');
const server = new MongoMemoryServer();
let connectionMock;

describe('Models Tests', () => {
  before(async () => {
    const urlMock = await server.getUri();
    connectionMock = await MongoClient.connect(urlMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await server.stop();
  });

  describe('Products Model', () => {

    describe('Function addProduct', () => {
      after(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('products').deleteMany({});
      });

      it('returns an object', async () => {
        const inputMock = { name: 'Heineken', quantity: 1 };
        const product = await productsModel.addProduct(inputMock);

        expect(product).to.be.an('object');
      });

      it('object of response has correct properties', async () => {
        const inputMock = { name: 'Budweiser', quantity: 1 };
        const product = await productsModel.addProduct(inputMock);

        expect(product).to.include.all.keys('_id', 'name');
      });
    });

    describe('Function findProductByName', () => {
      after(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('products').deleteMany({});
      });

      describe('If no products match', () => {
        it('response is null', async () => {
          const product = await productsModel.findProductByName('Heineken');
  
          expect(product).to.be.null;
        });
      });

      describe('If products match', () => {
        before(async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne({ name: 'Heineken', quantity: 10 });
        });

        it('response is an object', async () => {
          const product = await productsModel.findProductByName('Heineken');
          
          expect(product).to.be.an('object');
        });

        it('response has correct properties', async () => {
          const product = await productsModel.findProductByName('Heineken');
          
          expect(product).to.include.all.keys('_id', 'name');
        });
      });
    });

    describe('Function listProducts', () => {
      after(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('products').deleteMany({});
      });

      describe('if the list is empty', () => {
        it('response is an array', async () => {
          const products = await productsModel.listProducts();

          expect(products).to.be.an('array');
        });
        it('response is an empty array', async () => {
          const products = await productsModel.listProducts();

          expect(products).to.be.empty;
        });
      });

      describe('if the list has at least one item', () => {
        before(async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne({ name: 'Budweiser', quantity: 10 });
        });

        it('response is an array', async () => {
          const products = await productsModel.listProducts();

          expect(products).to.be.an('array');
        });

        it('item of array response is an object', async () => {
          const [item] = await productsModel.listProducts();

          expect(item).to.be.an('object');
        });

        it('item of response array has correct properties', async () => {
          const [item] = await productsModel.listProducts();

          expect(item).to.include.all.keys('_id', 'name');
        });
      });
    });

    describe('Function getProductById', () => {
      after(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('products').deleteMany({});
      });

      describe('if is an invalid id', () => {
        it('response is null', async () => {
          const product = await productsModel.getProductById(78548);

          expect(product).to.be.null;
        });
      });

      describe('if not product match', () => {
        it('response is null', async () => {
          const product = await productsModel.getProductById(ObjectId());

          expect(product).to.be.null;
        });
      });

      describe('if product match', () => {
        let validId;

        before(async () => {
          const db = connectionMock.db('StoreManager');
          const { insertedId } = await db.collection('products')
            .insertOne({ name: 'Stella Artois', quantity: 10 });
          validId = insertedId;
        });

        it('response is an object', async () => {
          const product = await productsModel.getProductById(validId);

          expect(product).to.be.an('object');
        });

        it('response has correct properties', async () => {
          const product = await productsModel.getProductById(validId);

          expect(product).to.include.all.keys('_id', 'name');
        });
      });
    });

    describe('Function updateById', () => {
      after(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('products').deleteMany({});
      });

      describe('if product match', () => {
        let validId;

        before(async () => {
          const db = connectionMock.db('StoreManager');
          const { insertedId } = await db.collection('products')
            .insertOne({ name: 'Stella Artois', quantity: 10 });
          validId = insertedId;
        });

        it('response is an object', async () => {
          const product = await productsModel
            .updateProductById(validId, { name: 'Becker', quantity: 5 });

          expect(product).to.be.an('object');
        });

        it('response has correct properties', async () => {
          const product = await productsModel
            .updateProductById(validId, { name: 'Becker', quantity: 5 });

          expect(product).to.include.all.keys('_id', 'name');
        });
      });
    });

    describe('Function deleteProductById', () => {
      after(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('products').deleteMany({});
      });

      describe('if product delete', () => {
        let validId;

        before(async () => {
          const db = connectionMock.db('StoreManager');
          const { insertedId } = await db.collection('products')
            .insertOne({ name: 'Stella Artois', quantity: 10 });
          validId = insertedId;
        });

        it('response is an object', async () => {
          const product = await productsModel.deleteProductById(validId);

          expect(product).to.be.an('object');
        });
      });
    });
  });

  describe('Sales Model Tests', () => {
    describe('createSales', () => {
      after(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('sales').deleteMany({});
      });

      it('return an object', async () => {
        const sale = await salesModel
          .createSales({ itensSold: [{id: 1234, quantity: 6}] });

        expect(sale).to.be.an('object');
      });

      it('object has correct properties', async () => {
        const sale = await salesModel
          .createSales({ itensSold: [{id: 1234, quantity: 6}] });

        expect(sale).to.include.all.keys('_id', 'itensSold');;
      });
    });

    describe('listSales', () => {
      before(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('sales').insertOne({ itensSold: [{id: 1234, quantity: 6}] });
      });

      after(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('sales').deleteMany({});
      });

      it('return an array', async () => {
        const sales = await salesModel.listSales();

        expect(sales).to.be.an('array');
      });

      it('item of array is an object', async () => {
        const [item] = await salesModel.listSales();

        expect(item).to.be.an('object');
      });

      it('item of array has correct properties', async () => {
        const [item] = await salesModel.listSales();

        expect(item).to.include.all.keys('_id', 'itensSold');
      });
    });

    describe('getSaleById', () => {
      let validId;

      before(async () => {
        const db = connectionMock.db('StoreManager');
        const { insertedId } = await db.collection('sales')
          .insertOne({ itensSold: [{id: 1234, quantity: 6}] });
        validId = insertedId;
      });

      after(async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('sales').deleteMany({});
      });

      it('response is an object', async () => {
        const sale = await salesModel.getSaleById(validId);

        expect(sale).to.be.an('object');
      });

      it('object has correct properties', async () => {
        const sale = await salesModel.getSaleById(validId);

        expect(sale).to.include.all.keys('_id', 'itensSold');
      });
    });

    // describe('updateSaleById', () => {});
    // describe('deleteSale', () => {});
  });
});
