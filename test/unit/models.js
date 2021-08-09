const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const ProductsModel = require('../../models/ProductsModel');
const SalesModel = require('../../models/SalesModel');

const DB_NAME = 'StoreManager';
const DB_COLLECTION = 'products';
const DB_SALES = 'sales';

// PRODUCTS

describe('Function getAllProducts', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('quando nao existir produtos cadastrados', () => {
    it('retorna um Array', async () => {
      const response = await ProductsModel.getAllProducts();

      expect(response).to.be.an('array');
    })

    it('o Array [e vazio', async () => {
      const response = await ProductsModel.getAllProducts();

      expect(response).to.be.empty;
    })
  })

  describe('quando existir produtos cadastrados', () => {
    before(async () => {
      connectionMock.db(DB_NAME).collection(DB_COLLECTION).insertOne({
        name: 'Cerveja',
        quantity: 10
      })
    });

    after(async () => {
      await connectionMock.db(DB_NAME).collection(DB_COLLECTION).deleteMany({});
    })

    it('retorna um Array', async () => {
      const response = await ProductsModel.getAllProducts();

      expect(response).to.be.an('array');
    })

    it('o Array nao [e vazio', async () => {
      const response = await ProductsModel.getAllProducts();

      expect(response).to.not.be.empty;
    })

    it('o Array possui itens do tipo object', async () => {
      const [response] = await ProductsModel.getAllProducts();

      expect(response).to.be.an('object');
    })

    it('as propriedades do object sao _id, name e quantity', async () => {
      const [response] = await ProductsModel.getAllProducts();

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    })
  })

});

describe('Function findById', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let Id;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const { insertedId } = await connectionMock.db(DB_NAME).collection(DB_COLLECTION).insertOne({
      name: 'Cerveja',
      quantity: 10
    })

    Id = insertedId;
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(DB_COLLECTION).deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('quando nao achar nenhum produto com ID', () => {
    it('retorna um null', async () => {
      const response = await ProductsModel.findById();

      expect(response).to.be.null;
    })
  });

  describe('quando achar um produto com ID', () => {
    it('retorna um object', async () => {
      const response = await ProductsModel.findById(Id);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function findByName', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db(DB_NAME).collection(DB_COLLECTION).insertOne({
      name: 'Cerveja',
      quantity: 10
    })
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(DB_COLLECTION).deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('quando nao achar nenhum produto com NAME', () => {
    it('retorna um null', async () => {
      const response = await ProductsModel.findByName();

      expect(response).to.be.null;
    })
  });

  describe('quando achar um produto com NAME', () => {
    it('retorna um object', async () => {
      const response = await ProductsModel.findByName('Cerveja');

      expect(response).to.be.an('object');
    })
  });
});

describe('Function createProduct', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(DB_COLLECTION).deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('quando criar um produto no banco', () => {
    const object = {
      name: "Cerveja",
      quantity: 10
    }

    it('retorna um object', async () => {
      const response = await ProductsModel.createProduct(object);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function editProduct', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let Id;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const { insertedId } = await connectionMock.db(DB_NAME).collection(DB_COLLECTION).insertOne({
      name: 'Cerveja',
      quantity: 10
    })

    Id = insertedId;
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(DB_COLLECTION).deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('quando edita um produto com ID', () => {
    it('retorna um object', async () => {
      const response = await ProductsModel.editProduct(Id, 'chocolate', 15);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function deleteProduct', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let Id;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const { insertedId } = await connectionMock.db(DB_NAME).collection(DB_COLLECTION).insertOne({
      name: 'Cerveja',
      quantity: 10
    })

    Id = insertedId
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(DB_COLLECTION).deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('deleta um produto com ID', () => {
    it('retorna um object', async () => {
      const response = await ProductsModel.deleteProduct(Id);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function buyProduct', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let Id;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const { insertedId } = await connectionMock.db(DB_NAME).collection(DB_COLLECTION).insertOne({
      name: 'Cerveja',
      quantity: 10
    })

    Id = insertedId
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(DB_COLLECTION).deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('decrementa o banco products quando faz compra', () => {
    it('retorna um object', async () => {
      const response = await ProductsModel.buyProduct(Id, 2);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function deleteSale', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let Id;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const { insertedId } = await connectionMock.db(DB_NAME).collection(DB_COLLECTION).insertOne({
      name: 'Cerveja',
      quantity: 10
    })

    Id = insertedId
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(DB_COLLECTION).deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('incremente o banco products quando deleta compra', () => {
    it('retorna um object', async () => {
      const response = await ProductsModel.deleteSale(Id, 2);

      expect(response).to.be.an('object');
    })
  });
});

// SALES

describe('Function createSales', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(DB_SALES).deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('quando criar um produto no banco', () => {
    const array = [{
      name: "Cerveja",
      quantity: 10
    }];

    it('retorna um object', async () => {
      const response = await SalesModel.createSales(array);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function getAllSales', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('quando nao tem compras no banco', () => {
    it('retorna um array', async () => {
      const response = await SalesModel.getAllSales();

      expect(response).to.be.an('array');
    })

    it('o Array [e vazio', async () => {
      const response = await SalesModel.getAllSales();

      expect(response).to.be.empty;
    })
  });

  describe('quando tem compras no banco', () => {
    before(async () => {
      connectionMock.db(DB_NAME).collection(DB_SALES).insertOne([{
        name: 'Cerveja',
        quantity: 10
      }])
    });

    after(async () => {
      await connectionMock.db(DB_NAME).collection(DB_SALES).deleteMany({});
    })

    it('retorna um array', async () => {
      const response = await SalesModel.getAllSales();

      expect(response).to.be.an('array');
    })
  });
});

describe('Function findById', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let Id;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const { insertedId } = await connectionMock.db(DB_NAME).collection(DB_SALES).insertOne({
      name: 'Cerveja',
      quantity: 10
    })

    Id = insertedId;
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(DB_SALES).deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('quando nao achar nenhum produto com ID', () => {
    it('retorna um null', async () => {
      const response = await SalesModel.findById();

      expect(response).to.be.null;
    })
  });

  describe('quando achar um produto com ID', () => {
    it('retorna um object', async () => {
      const response = await SalesModel.findById(Id);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function editSale', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let Id;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const { insertedId } = await connectionMock.db(DB_NAME).collection(DB_SALES).insertOne({
      itensSold: [{
        productId: '60e72ce912fb02363cd340e4',
        quantity: 10
      }]
    });

    Id = insertedId;
  });

  const body = [{
    productId: '60e72ce912fb02363cd340e4',
    quantity: 10
  }]

  after(async () => {
    await connectionMock.db(DB_NAME).collection(DB_SALES).deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('edita um produto com ID', () => {
    it('retorna um object', async () => {
      const response = await SalesModel.editSale(Id, body);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function deleteProduct', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  let Id;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const { insertedId } = await connectionMock.db(DB_NAME).collection(DB_SALES).insertOne({
      name: 'Cerveja',
      quantity: 10
    })

    Id = insertedId
  });

  after(async () => {
    await connectionMock.db(DB_NAME).collection(DB_SALES).deleteMany({});
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('deleta um produto com ID', () => {
    it('retorna um object', async () => {
      const response = await SalesModel.deleteSale(Id);

      expect(response).to.be.an('object');
    })
  });
});
