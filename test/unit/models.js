const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectID } = require('mongodb');

const connection = require('./connection');
const ProductsModel = require('../../models/Products');
const SalesModel = require('../../models/Sales');

describe('Testing the products model', () => {
  const test_product= { name: 'Product 01', quantity: 10 };
  describe('listing all products', () => {
    describe('When there is no registered product', async() => {
      let conn;
      
      before(async () => {
        conn = await connection();
        sinon.stub(MongoClient, 'connect').resolves(conn);
      });

      after(async() => {
        MongoClient.connect.restore();
      });

      it('Must return an empty array', async() => {
        const response = await ProductsModel.getAllProducts();
        const { products } = response.result;
        expect(products).to.be.a('array');
        expect(products).to.be.empty;
      })
    });

    describe('When there are registered products', async() => {
      let conn;
      
      before(async () => {
        conn = await connection();
        sinon.stub(MongoClient, 'connect').resolves(conn);
        await conn.db('StoreManager').collection('products').insertOne(test_product);
      });

      after(async() => {
        MongoClient.connect.restore();
        await conn.db('StoreManager').collection('products').deleteMany();
      });

      it('Must return products in array', async() => {
        const response = await ProductsModel.getAllProducts();
        const { products } = response.result;
        expect(products).to.be.an('array');
        expect(products).to.be.not.empty;
      })
    });
  });
  describe('Listing products by ID', () => {
    let conn;
    let product;
    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
      product = await conn.db('StoreManager').collection('products').insertOne(test_product);
    });

    after(async() => {
      MongoClient.connect.restore();
      await conn.db('StoreManager').collection('products').deleteMany({});
    });

    it('Must return an object', async () => {
      const response = await ProductsModel.getProductById(product.insertedId);
      expect(response.result).to.be.an('object');
      expect(response.result).to.have.property('_id');
    });
  });
  describe('Creating a product', () => {
    let conn;
    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
    });

    after(async() => {
      MongoClient.connect.restore();
      await conn.db('StoreManager').collection('products').deleteMany({});
    });

    it('Must return an object with the ID property', async () => {
      const response = await ProductsModel.createProduct(test_product);
      expect(response.result).to.be.an('object');
      expect(response.result).to.have.property('_id');
    });
  });
  describe('Editing a product', () => {
    let conn;
    let product;

    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
      product = await conn.db('StoreManager').collection('products').insertOne(test_product);
    });

    after(async() => {
      MongoClient.connect.restore();
      await conn.db('StoreManager').collection('products').deleteMany({});
    });
    
    const { name, quantity } = test_product;
    
    it('Must return an object with the ID property', async () => {
      const response = await ProductsModel.editProduct(product.insertedId, name, quantity);
      expect(response.result).to.be.an('object');
      expect(response.result).to.have.property('_id');
    });

    it('Must have updated the properties "name" and "quantity"', async () => {
      const response = await ProductsModel.editProduct(product.insertedId, name, quantity);
      expect(response.result.name).to.be.equal(name);
      expect(response.result.quantity).to.be.equal(quantity);
    });
  });
  describe('Deleting a product', () => {
    let conn;
    let product;

    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
      product = await conn.db('StoreManager').collection('products').insertOne(test_product);
    });

    after(async() => {
      MongoClient.connect.restore();
    });

    it('If sucess must return an object with the property ID', async () => {
      const response = await ProductsModel.deleteProduct(product.insertedId);
      expect(response.result).to.be.an('Object');
      expect(response.result).to.have.property('_id');
    })
    it('the product must no longer exist', async () => {
      await ProductsModel.deleteProduct(product.insertedId);
      const response = await ProductsModel.getProductById(product.insertedId);
      expect(response.result).to.be.null;
    });
  })
});

describe('Testing the sales model', () => {
  const test_id = new ObjectID('61033ad7023ffc5adba9f3f9');
  const test_sale = { productId: test_id, quantity: 10 };

  describe('listing all sales', () => {
    describe('When there is no registered sale', async() => {
      let conn;
      
      before(async () => {
        conn = await connection();
        sinon.stub(MongoClient, 'connect').resolves(conn);
      });

      after(async() => {
        MongoClient.connect.restore();
      });

      it('Must return an empty array', async() => {
        const response = await SalesModel.getAllSales();
        const { sales } =response.result;
        expect(sales).to.be.an('array');
        expect(sales).to.be.empty;
      })
    });

    describe('When there are registered sales', async() => {
      let conn;
      
      before(async () => {
        conn = await connection();
        sinon.stub(MongoClient, 'connect').resolves(conn);
        await conn.db('StoreManager').collection('sales').insertOne(test_sale);
      });

      after(async() => {
        MongoClient.connect.restore();
        await conn.db('StoreManager').collection('sales').deleteMany();
      });

      it('Must return sales in array', async() => {
        const response = await SalesModel.getAllSales();
        const { sales } = response.result;
        expect(sales).to.be.an('array');
        expect(sales).to.be.not.empty;
      });
    });
  });
  describe('Listing sales by ID', () => {
    let conn;
    let sale;
    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
      sale = await conn.db('StoreManager').collection('sales').insertOne(test_sale);
    });

    after(async() => {
      MongoClient.connect.restore();
      await conn.db('StoreManager').collection('sales').deleteMany({});
    });

    it('Must return an object with the property "ID"', async () => {
      const response = await SalesModel.getSaleById(sale.insertedId);
      expect(response.result).to.be.an('object');
      expect(response.result).to.have.property('_id');
    });
  });
  describe('Creating a sale', () => {
    let conn;
    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
    });

    after(async() => {
      MongoClient.connect.restore();
      await conn.db('StoreManager').collection('sales').deleteMany({});
    });

    it('Must return an object with the property "ID"', async () => {
      const response = await SalesModel.createSale(test_sale);
      expect(response.result).to.be.an('object');
      expect(response.result).to.have.property('_id');
    });
  });
  describe('Editing a sale', () => {
    let conn;
    let sale;

    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
      sale = await conn.db('StoreManager').collection('sales').insertOne(test_sale);
    });

    after(async() => {
      MongoClient.connect.restore();
      await conn.db('StoreManager').collection('sales').deleteMany({});
    });
    
    
    it('Must return an object with the ID property', async () => {
      const response = await SalesModel.editSale(sale.insertedId, test_sale);
      expect(response.result).to.be.an('object');
      expect(response.result).to.have.property('_id');
    });

    it('Must have updated the property "quantity"', async () => {
      const response = await SalesModel.editSale(sale.insertedId, [{ productId: new ObjectID('61033ad7023ffc5adba9f3f9'), quantity: 20 }]);
      const { itensSold } = response.result;
      expect(itensSold[0].quantity).to.be.equal(20);
    });
  });
  describe('Deleting a sale', () => {
    let conn;
    let sale;

    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
      sale = await conn.db('StoreManager').collection('sales').insertOne(test_sale);
    });

    after(async() => {
      MongoClient.connect.restore();
    });

    it('If sucess must return an object with the property ID', async () => {
      const response = await SalesModel.deleteSale(sale.insertedId);
      expect(response.result).to.be.an('Object');
      expect(response.result).to.have.property('_id');
    });

    it('the sale must no longer exist', async () => {
      const deletedSale = await SalesModel.deleteSale(sale.insertedId);
      const response = await SalesModel.getSaleById(sale.insertedId);
      expect(response.result).to.be.null;
    });

  });
});