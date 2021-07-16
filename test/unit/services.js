const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const ProductsModel = require('../../models/products');
const SalesModel = require('../../models/sales');

const ProductsService = require('../../services/products');
const SalesService = require('../../services/sales');
const validations = require('../../services/validations');

describe('operações de produto na camada de serviço', () => {
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

  describe('busca todos os produtos', () => {
    it('recebe todos os produtos', async () => {
      const result = await ProductsService.getAllProducts();

      expect(result).to.be.an('object').and.to.have.property('products');
    });
  });

  describe('busca um produto pelo id', () => {
    it('recebe o produto especificado', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const responseId = responseCreate._id;
      const result = await ProductsService.getProductById(responseId);

      expect(result).to.be.an('object').and.to.have.property('_id');
    });
    it('recebe nulo ao passar um id inválido', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const invalidId = 2;
      const result = await ProductsService.getProductById(invalidId);

      expect(result).to.be.null;
    });
  });

  describe('ao adicionar um produto', () => {
    it('caso o produto já exista no banco', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const result = await ProductsService.addProduct(product.name, product.quantity);

      expect(result.status).to.be.eq(422);
      expect(result.err.code).to.be.eq('invalid_data');
      expect(result.err.message).to.be.eq('Product already exists');
    });
    it('caso receba um nome inválido', async () => {
      const responseCreate = await ProductsService.addProduct('bola', product.quantity);

      expect(responseCreate.status).to.be.eq(422);
      expect(responseCreate.err.code).to.be.eq('invalid_data');
      expect(responseCreate.err.message).to.be.eq(
        '"name" length must be at least 5 characters long',
      );
    });
    it('caso receba uma quantity inválida', async () => {
      const responseCreate = await ProductsService.addProduct('Chapéu', -1);

      expect(responseCreate.status).to.be.eq(422);
      expect(responseCreate.err.code).to.be.eq('invalid_data');
      expect(responseCreate.err.message).to.be.eq('"quantity" must be larger than or equal to 1');
    });
  });

  describe('ao atualizar um produto', () => {
    it('caso o nome, quantidade e id seja fornecido corretamente', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const productId = responseCreate._id;
      const result = await ProductsService.updateProduct(productId, product.name, product.quantity);

      expect(result).to.be.a('object');
      expect(result.name).to.be.eq(product.name);
      expect(result.quantity).to.be.eq(product.quantity);
      //   expect(result.err.message).to.be.eq('Product already exists');
    });
    // it('recebe nulo ao passar um id inválido', async () => {
    //   const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
    //   const invalidId = 2;
    //   const result = await ProductsService.getProductById(invalidId);

    //   expect(result).to.be.null;
    // });
  });
});

describe('operações de vendas na camada de serviço', () => {
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

  describe('busca todos as vendas', () => {
    it('recebe todos as vendas', async () => {
      const result = await SalesService.getAllSales();

      expect(result).to.be.an('object').and.to.have.property('sales');
    });
  });

  describe('busca uma venda pelo id', () => {
    it('recebe a venda especificada', async () => {
      const responseCreateProduct = await ProductsModel.addProductDB(
        product.name,
        product.quantity,
      );
      const responseId = responseCreateProduct._id;
      const sale = [
        {
          productId: responseId,
          quantity: 2,
        },
      ];
      const responseCreateSale = await SalesModel.addSalesDB(sale);
      const saleID = responseCreateSale._id;

      const result = await SalesService.getSaleById(saleID);

      expect(result).to.be.an('object').and.to.have.property('_id');
    });
    // it('recebe nulo ao passar um id inválido', async () => {
    //   const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
    //   const invalidId = 2;
    //   const result = await ProductsService.getProductById(invalidId);

    //   expect(result).to.be.null;
    // });
  });

  describe('adiciona uma venda', () => {
    it('com sucesso', async () => {
      const responseCreateProduct = await ProductsModel.addProductDB(
        product.name,
        product.quantity,
      );
      const responseId = responseCreateProduct._id;
      const sale = [
        {
          productId: responseId,
          quantity: 2,
        },
      ];
      const responseCreateSale = await SalesService.addSales(sale);

      expect(responseCreateSale).to.be.an('object').and.to.have.property('_id');
    });
    it('recebe nulo ao passar um id inválido', async () => {
      const responseCreate = await ProductsModel.addProductDB(product.name, product.quantity);
      const invalidId = 2;
      const result = await ProductsService.getProductById(invalidId);

      expect(result).to.be.null;
    });
  });

  describe('atualiza uma venda', () => {
    it('com sucesso', async () => {
      const responseCreateProduct = await ProductsModel.addProductDB(
        product.name,
        product.quantity,
      );
      const responseId = responseCreateProduct._id;
      const sale = [
        {
          productId: responseId,
          quantity: 2,
        },
      ];
      const responseCreateSale = await SalesModel.addSalesDB(sale);
      const responseIdSale = responseCreateSale._id;
      const newSale = [
        {
          productId: responseId,
          quantity: 4,
        },
      ];
      const responseUpdateSale = await SalesService.updateSale(responseIdSale, newSale);

      expect(responseUpdateSale).to.be.eq('object');
    });
  });

  describe('deleta uma venda', () => {
    it('com sucesso', async () => {
      const responseCreateProduct = await ProductsModel.addProductDB(
        product.name,
        product.quantity,
      );
      const responseId = responseCreateProduct._id;
      const sale = [
        {
          productId: responseId,
          quantity: 2,
        },
      ];
      const responseCreateSale = await SalesService.addSales(sale);
      const responseIdSale = responseCreateSale._id;
      const newSale = [
        {
          productId: responseId,
          quantity: 4,
        },
      ];
      const responseUpdateSale = await SalesService.updateSale(responseIdSale, newSale);

      expect(responseUpdateSale).to.be.eq('object');
    });
  });
});
