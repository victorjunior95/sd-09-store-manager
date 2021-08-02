const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId } = require('mongodb');

const ProductsModel = require('../../models/products');
const ProductsService = require('../../services/products');
const SalesModel = require('../../models/sales');
const SalesServices = require('../../services/sales');

const PRODUCT = {
  _id: ObjectId(),
  name: 'ProdutoTeste',
  quantity: 10
};

const SALE = {
  _id: ObjectId(),
  itensSold: [{
    productId: ObjectId(),
    quantity: 100
  }]
};

describe('Testando... services/products', () => {
  describe('Verifica se adiciona novo produto', () => {
    before(() => {
      sinon.stub(ProductsModel, 'postProduct').resolves(PRODUCT);
    });

    after(() => {
      ProductsModel.postProduct.restore();
    });

    it('Verifica retorno ao adicionar novo produto com sucesso"', async () => {
      const { name, quantity } = PRODUCT;
      const res = await ProductsService.postProduct(name, quantity);

      expect(res).to.be.an('object');
      expect(res).to.have.property('_id');
      expect(res).to.have.property('name');
      expect(res).to.have.property('quantity');
    });

    it('Verifica o retorno caso name não seja uma string ou tenha menos de 05 caracteres', async () => {
      const code = 'invalid_data';
      const msg = '"name" length must be at least 5 characters long';
      const product01 = { name: 'Bag', quantity: 10 };
      const res = await ProductsService.postProduct(product01);

      expect(res).to.be.an('object');
      expect(res.err.code).to.be.equal(code);
      expect(res.err.message).to.be.equal(msg);

      const product02 = { name: 100, quantity: 10 };
      const res02 = await ProductsService.postProduct(product02);

      expect(res02).to.be.an('object');
      expect(res02.err.code).to.be.equal(code);
      expect(res02.err.message).to.be.equal(msg);
    });

    it('Verifica se já existe o produto', async () => {
      const code = 'invalid_data';
      const msg = 'Product already exists';
      const { name, quantity } = PRODUCT;

      const res = await ProductsService.postProduct(name, quantity);
      const res02 = await ProductsService.postProduct(PRODUCT);

      expect(res02).to.be.an('object');
      expect(res02.err.code).to.be.equal(code);
      expect(res02.err.message).to.be.equal(msg);
    });

  });

  describe('Verificar se retorna todos os produtos cadastrados', async () => {
    it('Listando todos os produtos', async () => {
      sinon.stub(ProductsModel, 'getAllProducts').resolves(PRODUCT);
      const res = await ProductsService.getAllProducts();

      expect(res).to.be.an('object');
      expect(res).to.have.property('products');
      expect(res.products).to.have.property('_id');
      expect(res.products).to.have.property('name');
      expect(res.products).to.have.property('quantity');
    });
  });

  describe('Verifica se retorna um produto pelo seu ID', async () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getProductById').resolves(PRODUCT);
    });

    afterEach(() => {
      ProductsModel.getProductById.restore();
    });

    it('Verifica o retorno ao listar um produto pelo seu ID', async () => {
      const res = await ProductsService.getProductById(PRODUCT._id);

      expect(res).to.be.an('object');
      expect(res).to.have.property('_id');
      expect(res).to.have.property('name');
      expect(res).to.have.property('quantity');
    });

    it('Verifica se retorna um objeto de erro caso seja um ID inválido', async () => {
      const product01 = '123546';
      const res = await ProductsService.getProductById(product01);

      expect(res).to.be.an('object');
      expect(res.err.code).to.be.equal('invalid_data');
      expect(res.err.message).to.be.equal('Wrong id format');
    });
  });

  describe('Verifica se atualiza um produto', async () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'putProduct').resolves(PRODUCT);
    });

    afterEach(() => {
      ProductsModel.putProduct.restore();
    });

    it('Verifica se retorna um objeto de erro caso quantity seja uma string', async () => {
      const resolve = await ProductsService.putProduct(PRODUCT._id, PRODUCT.name, {
        quantity: 'ten'
      });

      expect(resolve).to.be.an('object');
      expect(resolve.err.code).to.be.equal('invalid_data');
      expect(resolve.err.message).to.be.equal('"quantity" must be a number');
    });
  });

  describe('Verifica se é possível deletar um produto', async () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'deleteProduct').resolves(PRODUCT);
    });

    afterEach(() => {
      ProductsModel.deleteProduct.restore();
    });

    it('Verifica retorno ao remover com sucesso', async () => {
      const res = await ProductsService.deleteProduct(PRODUCT._id);

      expect(res).to.be.an('object');
    });

    it('Exibe erro quando não for possível deletar um produto', async () => {
      const product01 = '123546';
      const res = await ProductsService.deleteProduct(product01);

      expect(res).to.be.an('object');
      expect(res.err.code).to.be.equal('invalid_data');
      expect(res.err.message).to.be.equal('Wrong id format');
    });
  });
});

describe('Testando... services/sales', async () => {
  describe('Verifica se é possível adicionar uma venda', async () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'postSales').resolves(SALE);
      sinon.stub(ProductsModel, 'getProductById').resolves(PRODUCT);
      sinon.stub(ProductsModel, 'putProduct').resolves({});
    });

    afterEach(() => {
      SalesModel.postSales.restore();
      ProductsModel.getProductById.restore();
      ProductsModel.putProduct.restore();
    });

    it('Verifica retorno de uma venda com sucesso.', async () => {
      const product01 = [{ productId: ObjectId(), quantity: 10 }];
      const resolve = await SalesServices.postSales(product01);

      expect(resolve).to.be.an('object');
      expect(resolve).to.have.property('_id');
      expect(resolve).to.have.property('itensSold');
    });

    it('Verifica retorno de um objeto de erro caso quantity seja uma string', async () => {
      const sale01 = [{ productId: ObjectId(), quantity: 'ten' }];
      const resolve = await SalesServices.postSales(sale01);

      expect(resolve).to.be.an('object');
      expect(resolve.err.code).to.be.equal('invalid_data');
      expect(resolve.err.message).to.be.equal('Wrong product ID or invalid quantity');
    });

    it('Verifica se retorna um objeto de erro caso a quantidade em estoque não atenda a venda', async () => {
      const sale01 = [{ productId: ObjectId(), quantity: 1000 }];
      const resolve = await SalesServices.postSales(sale01);

      expect(resolve).to.be.an('object');
      expect(resolve.err.code).to.be.equal('stock_problem');
      expect(resolve.err.message).to.be.equal('Such amount is not permitted to sell');
    });
  });

  describe('Verifica se lista todas as vendas cadastradas', async () => {
    before(() => {
      sinon.stub(SalesModel, 'getAllSales').resolves(SALE);
    });
    after(() => SalesModel.getAllSales.restore());

    it('verifica retorno com todas as vendas cadastradas', async () => {
      const res = await SalesServices.getAllSales();

      expect(res).to.be.an('object');
      expect(res).to.have.property('sales');
      expect(res.sales).to.have.property('_id');
      expect(res.sales).to.have.property('itensSold');
    });
  });

  describe('Verifica se lista uma venda pelo seu ID', async () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getSaleById').resolves(SALE);
    });
    afterEach(() => {
      SalesModel.getSaleById.restore();
    });

    it('Verifica retorno de venda pelo seu ID', async () => {
      const res = await SalesServices.getSaleById(SALE._id);

      expect(res).to.be.an('object');
      expect(res).to.have.property('_id');
      expect(res).to.have.property('itensSold');
    });

    it('Verifica retorno de um objeto de erro caso o ID seja inválido/não existente', async () => {
      const id = '000000';
      const rees = await SalesServices.getSaleById(id);

      expect(rees).to.be.an('object');
      expect(rees.err.code).to.be.equal('not_found');
      expect(rees.err.message).to.be.equal('Sale not found');
    });
  });

  describe('Deve atualizar uma venda pelo seu ID', async () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'putSales').resolves({});
      sinon.stub(ProductsModel, 'getProductById').resolves(PRODUCT);
      sinon.stub(ProductsModel, 'putProduct').resolves({});
    });
    afterEach(() => {
      SalesModel.putSales.restore();
      ProductsModel.getProductById.restore();
      ProductsModel.putProduct.restore();
    });

    it('Verifica rertorno ao atualizar uma venda com sucesso.', async () => {
      const sale01 = [{ productId: ObjectId(), quantity: 10 }];
      const resolve = await SalesServices.putSales(SALE._id, sale01);

      expect(resolve._id).to.be.equal(sale01.productId);
    });

    it('Verifica retorno de um objeto de erro caso quantity seja uma string', async () => {
      const sale01 = [{ productId: ObjectId(), quantity: 'ten' }];
      const resolve = await SalesServices.putSales(sale01);

      expect(resolve).to.be.an('object');
      expect(resolve.err.code).to.be.equal('invalid_data');
      expect(resolve.err.message).to.be.equal('Wrong product ID or invalid quantity');
    });

  });

  describe('Verifica se deleta uma venda pelo seu ID', async () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'deleteSales').resolves(SALE);
      sinon.stub(SalesModel, 'getSalesById').resolves(SALE);
      sinon.stub(ProductsModel, 'getProductById').resolves(PRODUCT);
      sinon.stub(ProductsModel, 'putProduct').resolves({});
    });

    afterEach(() => {
      SalesModel.deleteSales.restore();
      SalesModel.getSalesById.restore();
      ProductsModel.getProductById.restore();
      ProductsModel.putProduct.restore();
    });

    it('Verifica retorno ao deletar um venda pelo ID', async () => {
      const id = SALE._id;
      const res = await SalesServices.deleteSales(id);

      expect(res).to.be.an('object');
      expect(res).to.have.property('_id');
      expect(res).to.have.property('itensSold');
    });

    it('Verifica retorno um objeto de erro caso o ID seja inválido', async () => {
      const id = '000000';
      const res = await SalesServices.deleteSales(id);

      expect(res).to.be.an('object');
      expect(res.err.code).to.be.equal('invalid_data');
      expect(res.err.message).to.be.equal('Wrong sale ID format');
    });
  });
});
