const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId } = require('mongodb');

const ProductsServices = require('../../services/products');
const ProductsModels = require('../../models/products');
const SalesServices = require('../../services/sales');
const SalesModels = require('../../models/sales');

const product = { _id: ObjectId() , name: 'ProdutoTeste', quantity: 10 };

const newSale = {
  _id: ObjectId(),
  itensSold: [{
    productId: ObjectId(),
    quantity: 100
  }]
};

describe('Testando... services/products', () => {
  before(() => {
    sinon.stub(ProductsModels, 'postProduct').resolves(product);
  });

  after(() => {
    ProductsModels.postProduct.restore();
  })

  it('Testando se adiciona produto com sucesso.', async () => {
    const { name, quantity } = product;   
    const res = await ProductsServices.postProduct(name, quantity);
  
    expect(res).to.have.property('_id');
    expect(res).to.have.property('name');
    expect(res).to.have.property('quantity');
  });
});

describe('', () => {
  before(() => {
    sinon.stub(ProductsModels, 'postProduct').resolves(null);
  });

  it('Testando quando nome já existe.', async () => {
    const { name, quantity } = product;   
    const res = await ProductsServices.postProduct(name, quantity);
  
    expect(res).to.be.a('null');
  });
});

describe('', () => {
  before(() => {
    sinon.stub(ProductsModels, 'getAllProducts').resolves([ product ]);
  });

  it('Testando busca de todos os produtos cadastrados.', async () => {
    const res = await ProductsServices.getAllProducts();

    expect(res).to.be.an('array');
    expect(res).to.have.length(1);

    res.forEach((e) => {
      expect(e).to.have.property('_id');
      expect(e).to.have.property('name');
      expect(e).to.have.property('quantity');
    });
  });
});

describe('', () => {
  before(() => {
    sinon.stub(ProductsModels, 'getProductById').resolves(product);
  });

  it('Testando busca de produto com ID específico.', async () => {
    const res = await ProductsServices.getProductById();

    expect(res).to.be.an('object');
    expect(res).to.have.property('_id');
    expect(res).to.have.property('name');
    expect(res).to.have.property('quantity');
  });
});

describe('Testando... services/sales', () => {
  before(() => {
    sinon.stub(SalesModels, 'postSales').resolves( newSale );
  });

  it('Testando adicionar nova venda.', async () => {
    const res = await SalesServices.postSales([ newSale ]);

    expect(res).to.be.an('object');
    expect(res).to.have.property('_id');
    expect(res).to.have.property('itensSold');
  });
});

describe('', () => {
  before(() => {
    sinon.stub(SalesModels, 'getAllSales').resolves([ newSale ]);
  });

  it('Testando recuperar todas as vendas.', async () => {
    const res = await SalesServices.getAllSales();

    expect(res).to.be.an('array');
    expect(res).to.have.length(1);

    res.forEach((e) => {
      expect(e).to.have.property('_id');
      expect(e).to.have.property('itensSold');
    });
  });
});

describe('', () => {
  before(() => {
    sinon.stub(SalesModels, 'deleteSales').resolves( [newSale] );
  });

  it('Testando deletar todas as vendas.', async () => {
    const res = await SalesServices.deleteSales();

    expect(res).to.have.property('code');
    expect(res).to.have.property('status');
  });
});

describe('', () => {
  before(() => {
    sinon.stub(SalesModels, 'putSales').resolves( newSale );
  });

  it('Testando alterar uma venda.', async () => {
    const res = await SalesServices.putSales();

    expect(res).to.have.property('_id');
    expect(res).to.have.property('itensSold');
  });
});

describe('', () => {
  before(() => {
    sinon.stub(SalesModels, 'getSalesById').resolves( newSale );
  });

  it('Testando recuperar venda pelo ID.', async () => {
    const res = await SalesServices.getSalesById();

    expect(res).to.have.property('_id');
    expect(res).to.have.property('itensSold');
  });
});