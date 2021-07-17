const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const productsModel = require('../../models/ProductsModel');
const salesModel = require('../../models//SalesModel');
const newProduct = {
  name: 'Produto Silva',
  quantity: 10,
};

const newSale = [
  {
    productId: '5f43ba273200020b101fe49f',
    quantity: 2
  }
];

const updateProduct = {
  name: 'Produto do Batista',
  quantity: 20,
};

describe('Insert a new product', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('When insertion is successful', () => {
    it('Should returns an object', async () => {
      const product = await productsModel.addProduct(newProduct);
      expect(product).to.be.a('object');
    });
    it('Should have an ID attribute', async () => {
      const product = await productsModel.addProduct(newProduct);
      expect(product).to.have.a.property('insertedId');
    });
  });


});

describe('Insert a new sale', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
  });
  describe('When insertion is successful', () => {
    it('Should returns an object', async () => {
      sale = await salesModel.addSale(newSale);
      expect(sale).to.be.a('object');
    });
    it('Should have an ID attribute', async () => {
      sale = await salesModel.addSale(newSale);
      expect(sale).to.have.a.property('insertedId');
    });
  });

});

describe('Get all products', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after( () => {
    MongoClient.connect.restore();
  });

  describe('When there is no products in DB', () => {
    it('Should returns an array', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.an('array');
    });
    it('Should returns an empty array', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.empty;
    });
  });

  describe('When there is at least one product in DB', () => {
    before( async () => {
      await productsModel.addProduct(newProduct);
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    it('Should returns an array', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.an('array');
    });
    it('Should returns a not empty array', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.not.be.empty;
    });

    it('Should returns an array with objects', async () => {
      [item] = await productsModel.getAllProducts();
      expect(item).to.be.an('object');
    });

    it('Should returns an array with objects wich has mandatory attributes', async () => {
      const [item] = await productsModel.getAllProducts();
      expect(item).to.include.all.keys('name', 'quantity');
    });
  });


});

describe('Get all sales', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore;
  });

  describe('When there is no sales in DB', () => {
    it('Should returns an array', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.be.an('array');
    });
    it('Should returns an empty array', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.be.empty;
    });
  });

  describe('When there is at least one sale in DB', () => {
    before( async () => {
      await salesModel.addSale(newSale);
    });
    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
      MongoClient.connect.restore();
    });

    it('Should returns an array', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.be.an('array');
    });

    it('Should returns a not empty array', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.not.be.empty;
    });

    it('Should returns an array with objects', async () => {
      [item] = await salesModel.getAllSales();
      expect(item).to.be.an('object');
    });

    it('Should returns an array with objects wich has mandatory attributes', async () => {
      const [item] = await salesModel.getAllSales();
      expect(item).to.include.all.keys('_id', 'itensSold');
    });
  });


});

describe('Update a product', () => {
  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
  });

  it('Should update a product with the productId, name and quantity', async () => {
    const { insertedId } = await productsModel.addProduct(newProduct);
    const { name, quantity } = updateProduct;
    const { modifiedCount } = await productsModel.updateProduct(insertedId, name, quantity);
    expect(modifiedCount).to.be.equal(1);
    const product = await productsModel.getProductById(insertedId);
    expect(product.quantity).to.be.equal(updateProduct.quantity);
  });
});

describe('Update a sale', () => {
  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  it('Should update a sale with the ID and the item sold', async () => {
    const { insertedId } = await salesModel.addSale(newSale);
    const newItemSold = { productId: newSale[0].productId, quantity: 20 };
    const { modifiedCount } = await salesModel.editSale(insertedId, newItemSold);
    expect(modifiedCount).to.be.equal(1);
    const { itensSold } = await salesModel.findById(insertedId);
    expect(itensSold.quantity).to.be.equal(20);
  });
});

describe('Delete a product', () => {
  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  it('Should delete a sale with the ID', async () => {
    const { insertedId } = await productsModel.addProduct(newProduct);
    const response = await productsModel.deleteProduct(insertedId);
    expect(response.deletedCount).to.be.equal(1);
  });
});

describe('Delete a sale', () => {
  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  it('Should delete a sale with the ID', async () => {
    const { insertedId } = await salesModel.addSale(newSale);
    const response = await salesModel.deleteSale(insertedId);
    expect(response.deletedCount).to.be.equal(1);
  });

});
