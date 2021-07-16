const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const ProductsModel = require('../../models/products');
const SalesModel = require('../../models/sales');

describe('operações de produto no DB', () => {
  const product = {
    name: 'Camisa da Trybe',
    quantity: 10,
  };

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(connMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await ProductsModel.addProductDB(product.name, product.quantity);

      expect(response).to.be.an('object');
    });

    it('retorna um objeto com nome, quantidade e id', async () => {
      const response = await ProductsModel.addProductDB(product.name, product.quantity);

      expect(response).to.have.property('_id');
      expect(response).to.have.property('name').and.equal('Camisa da Trybe');
      expect(response).to.have.property('quantity').and.equal(10);
    });
  });

  describe('quando requisita a lista de produtos cadastrados', () => {
    it('retorna um objeto com uma propriedade que conterá lista de produtos', async () => {
      const response = await ProductsModel.getAllProductsDB();

      expect(response).to.be.an('object');
      expect(response).to.have.property('products').and.to.be.an('array');
    });

    it('retorna lista com produtos previamente cadastrados', async () => {
      await ProductsModel.addProductDB(product.name, product.quantity);
      const response = await ProductsModel.getAllProductsDB();

      const productName = response.products[0].name;
      const productQuantity = response.products[0].quantity;

      expect(productName).to.be.a.equal(product.name);
      expect(productQuantity).to.be.a.equal(product.quantity);
    });
  });

  describe('quando requisita um produto pelo nome', () => {
    it('retorna um objeto com o produto especificado', async () => {
      await ProductsModel.addProductDB(product.name, product.quantity);
      const response = await ProductsModel.getByNameDB(product.name);
      const productName = response.name;

      expect(response).to.be.an('object');
      expect(productName).to.be.a.equal(product.name);
    });
  });

  describe('quando requisita um produto pelo id', () => {
    it('retorna um objeto com o produto especificado', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const responseId = responseCreate._id;
      const productName = responseCreate.name;

      const response = await ProductsModel.getProductByIdDB(responseId);

      expect(response).to.be.an('object');
      expect(productName).to.be.a.equal(product.name);
    });
  });

  describe('quando edita um produto no DB', () => {
    it('retorna um objeto com o produto especificado', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const responseId = responseCreate._id;
      const productName = 'Casaco da Trybe';
      const updatedQuantity = product.quantity + 1;
      const response = await ProductsModel.editProductDB(responseId, productName, updatedQuantity);

      expect(response).to.be.an('object');
      expect(response.name).to.be.a.equal(productName);
      expect(response.quantity).to.be.a.equal(updatedQuantity);
    });
  });

  describe('quando deleta um produto no DB', () => {
    it('deleta product no banco', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const responseId = responseCreate._id;
      const responseDelete = await ProductsModel.deleteProductDB(responseId);
      const responseSearchAfterDelete = await ProductsModel.getProductByIdDB(responseId);

      expect(responseDelete).to.be.a.property('name').and.equal(product.name);
      expect(responseSearchAfterDelete).to.be.null;
    });
  });
});

describe('operações de vendas no DB', () => {
  const product = {
    name: 'Camisa da Trybe',
    quantity: 10,
  };

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const connMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(connMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('quando é inserida com sucesso', () => {
    it('retorna um objeto com o id da venda e o id do produto', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const responseId = responseCreate._id;
      const sale = [{
        productId: responseId,
        quantity: 2,  
      }];
      const responseSale = await SalesModel.addSalesDB(sale);
      const responseProductId = responseSale.itensSold[0].productId;

      expect(responseSale).to.be.an('object').and.to.have.property('_id');
      expect(responseProductId).to.be.a.equal(responseId);
    });
  });

  describe('quando requisita a lista de vendas cadastradas', () => {
    it('retorna um objeto com uma propriedade que conterá a lista de vendas', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const responseId = responseCreate._id;
      const sale = [{
        productId: responseId,
        quantity: 2,  
      }];
      await SalesModel.addSalesDB(sale);
      const response = await SalesModel.getAllSalesDB()

      expect(response).to.be.an('object');
      expect(response).to.have.property('sales').and.to.be.an('array');
    });
  });

  describe('quando requisita uma venda pelo id', () => {
    it('retorna a venda', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const responseId = responseCreate._id;
      const sale = [{
        productId: responseId,
        quantity: 2,  
      }];
      const responseSale = await SalesModel.addSalesDB(sale);
      const responseIdSale = responseSale._id;
      const response = await SalesModel.getSaleByIdDB(responseIdSale);

      expect(response).to.be.an('object');
      expect(response.itensSold[0].productId).to.be.a.eql(responseId);
    });
  });

  describe('quando deleta uma venda pelo id', () => {
    it('retorna a venda deletada e deleta a venda do DB', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const responseId = responseCreate._id;
      const sale = [{
        productId: responseId,
        quantity: 2,  
      }];

      const responseSale = await SalesModel.addSalesDB(sale);
      const responseIdSale = responseSale._id;

      const response = await SalesModel.deleteSaleDB(responseIdSale);

      expect(response).to.be.eql(responseSale);

      const saleDeleted = await SalesModel.getSaleByIdDB(responseIdSale);
      expect(saleDeleted).to.be.null;
    });
  });
});
