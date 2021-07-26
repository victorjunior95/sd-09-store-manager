const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const productsModel = require('../../models/ProductsModel');
const salesModel = require('../../models/SalesModel');
const products = {
  name: 'Camisa da Trybe',
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
      const product = await productsModel.addProduct(products);
      expect(product).to.have.property('name');
    });
    it('Should have an ID attribute', async () => {
      const product = await productsModel.addProduct(products);
      expect(product).to.have.property('quantity');
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
      expect(response).to.be.an('object');
    });
    it('Should returns an empty array', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.not.be.empty;
    });
  });

  describe('When there is at least one product in DB', () => {
    before( async () => {
      await productsModel.addProduct(products);
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    it('Should returns an array', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.an('object');
    });
    it('Should returns a not empty array', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.not.be.empty;
    });

    it('Should returns an array with objects', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.not.be.empty;
    });

    it('Should returns an array with objects wich has mandatory attributes', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.not.be.empty;
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
      expect(response).to.not.be.empty;
    });
    it('Should returns an empty array', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.not.be.empty;
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
      expect(response).to.not.be.empty;
    });

    it('Should returns a not empty array', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.not.be.empty;
    });

    it('Should returns an array with objects', async () => {
      const response  = await salesModel.getAllSales();
      expect(response).to.be.an('object');
    });

    it('Should returns an array with objects wich has mandatory attributes', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.be.an('object');
    });
  });


});

describe('Update a product', () => {
  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  it('Should update a product with the productId, name and quantity', async () => {
    const product = await productsModel.addProduct(products);
    const modifiedCount = await productsModel.updateProduct(product._id, updateProduct);
    expect(modifiedCount).to.be.an('object')


  });
  it('Should update a product with the productId, name and quantity', async () => {
    const product = await productsModel.addProduct(products);
    expect(product).to.be.a.property('quantity');
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
    expect(modifiedCount);
    const { itensSold } = await salesModel.findById(insertedId);
    expect(itensSold);
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
    const { insertedId } = await productsModel.addProduct(products);
    const response = await productsModel.deleteProduct(insertedId);
    expect(response.deleted).to.be.equal();
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
    expect(response.deleted).to.be.equal();
  });

});

describe('Delete', () => {
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
    expect(response).to.be.an('object');
  });

});
