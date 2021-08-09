// retomar o video no minuto 1:06:52
const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../models/product');
const productService = require('../../service/products');
const salesModel = require('../../models/sales');
const salesService = require('../../service/sales')
const { ObjectId } = require('mongodb');

describe('insere um novo produto no db', () => {
  const testProduct = { name: 'Mathaus', quantity: 10 };
  describe('quando o produto informado é criado com sucesso', () => {
    before(() => {
      sinon.stub(productModel, 'createProduct').resolves({
        name: 'Mathaus', 
        quantity: 10,
      })
    })
    after(() => {
      productModel.createProduct.restore();
    })   
    it('retorna um objeto', async () => {
      const response = await productService.createProduct(testProduct);
      expect(response).to.be.a('object')
    })
    it('o objeto possui as props: _id, name, quantity', async () => {
      response = await productService.createProduct(testProduct)
      expect(response).to.include.all.keys('name', 'quantity');
    })
  })
})

describe('faz a listagem de todos os produtos', () => {
  describe('quando nã existe produto cadastrado', async () =>{
    before(() => {
      sinon.stub(productModel, 'getProducts').resolves([])
    })
    after(() => {
      productModel.getProducts.restore();
    })
    it('retorna um array', async() => {
      const response = await productService.getAllProduct()
      expect(response).to.be.an('array');
    })
    it('o array é vazio', async() => {
      const response = await productService.getAllProduct();
      expect(response).to.be.empty;
    })
  })
  describe('quando existe produto cadastrado', () => {
    before(() => {
      sinon.stub(productModel, 'getProducts')
        .resolves([
          {
            _id: '610be0981fabee2a9551e268', 
            name:'mathaus', 
            quantity:10
          }
        ])
    })
    after(() => productModel.getProducts.restore())
    it('retorna um array não vazio', async() => {
      const response = await productService.getAllProduct();
      expect(response).to.not.be.empty
    })
    it('retorna um objeto', async() => {
      const [response] = await productService.getAllProduct();
      expect(response).to.be.an('object')
    })
    it('retorna um objeto com as props: _id, name, quantity', async () => {
      const [response] = await productService.getAllProduct();
      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    })
  })
})

describe('testa se o produto é econtrado por ID', () => {
  const idFalse = ObjectId('610be0981fabee2a9551e268')
  const testId ={
    _id: idFalse, 
    name:'mathaus', 
    quantity:10
  }
  
  describe('se não retornar nada', () => {
    before(() => {
      sinon.stub(productModel, 'productsId').resolves({})
    })
    after(() => productModel.productsId.restore());
    it('ID invalido', async() => {
      const response = await productService.findById();
      expect(response).to.be.empty
    })
  })
  describe('quando o ID é valido', () => {
    before(() => {
      sinon.stub(productModel, 'productsId').resolves(testId);
    })
    after(() => productModel.productsId.restore());
    it('recebe um objeto', async() => {
      const response = await productService.findById(idFalse);
      expect(response).to.be.an('object');
    })
    it('recebe um objecto com as props: _id, name, quantity', async () => {
      const response = await productService.findById(idFalse);
      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    })
  })
})

describe('testa a edição de produtos', () => {
  const _id = ObjectId('610be0981fabee2a9551e268');
  const fakeProduct = { name: 'Mathaus', quantity: 10 };
  const fakeReplace = { name: 'skate', quantity: 7 };
  before(() => {
    sinon.stub(productModel, 'editProducts').resolves({_id, fakeProduct})
  })
  after(() => productModel.editProducts.restore())
  it('verifica se retorna um objeto', async() => {
    const {response} = await productService.editProduct(_id, fakeProduct)
    expect({response}).to.be.an('object')
  })
  it('verifica se o produto foi atualizado', async () => {
    const response = await productService.editProduct({_id, fakeReplace});
    expect(response).to.have.a.property('_id')
  })
});

describe('testa se um produto é deletado com sucesso', () => {
  const _id = ObjectId('610be0981fabee2a9551e268');
  before(() => {
    sinon.stub(productModel,'deleteProduct').resolves(_id)
  });
  after(() => productModel.deleteProduct.restore());
  it('testa se o produto é removido com sucesso', async () => {
    const response = await productService.deleteProduct(_id)
    const removeID = await productService.findById(response)
    expect(removeID).to.be.null;
  })
})

describe('testa a criação de vendas', () => {
  const _id = '610007e7604ebb2c6bf20454';
  const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];
  before(() => {
    sinon.stub(salesModel, 'create').resolves({_id, itensSold})
  })
  after(() => salesModel.create.restore())
  it('verifica se retorna um objeto', async() => {
    const response = await salesService.create(itensSold);
    expect(response).to.be.an('object')
  });
})

describe('testa a listagem de vendas', () => {
  describe('quando não existe vendas cadastradas', () => { 
    before(() => {
      sinon.stub(salesModel, 'getAllSales').resolves([])
    })
    after(() => salesModel.getAllSales.restore())
    it('retorna um array', async () => {
      const response = await salesService.getAllSales();
      expect(response).to.be.an('array');
    })
    it('quando o array vem vazio', async() => {
      const response = await salesService.getAllSales();
      expect(response).to.be.empty
    })
  })
  describe('quando existe vendas cadastradas', () => {
    before(() => {
      sinon.stub(salesModel, 'getAllSales').resolves( {sales: [
        { _id: '610007e7604ebb2c6bf20454', itensSold: [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 1 }] },
        { _id: '610007e7604ebb2c6bf20454', itensSold: [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }] }
      ]});
    });
    after(() => salesModel.getAllSales.restore())
    it('retorna um array', async() => {
      const response = await salesService.getAllSales()
      expect(response.sales).to.be.an('array')
    })
    it('retorna um array não vazio', async() => {
      const response = await salesService.getAllSales()
      expect(response.sales).to.not.be.empty
    })
    it('must have to be an object', async () => {
      const response = await salesService.getAllSales()
      expect(response.sales[0]).to.be.an('object') 
    })
    it('retorna um objeto com as props _id e itensSold', async() => {
      const response = await salesService.getAllSales()
      expect(response.sales[0]).to.include.all.keys('_id', 'itensSold')
    })
  })
})

describe('testa a busca de produtos por ID', () => {
  describe('quando o ID é invalido', () => {
    before(() => {
      sinon.stub(salesModel, 'getIdSales').resolves(null)
    })
    after(() => salesModel.getIdSales.restore())
    it('retorna ID nulo', async() => {
      const response = await salesService.getSalesId();
      expect(response).to.be.null
    })
  })
  describe('quando ID retorna uma venda', () => {
    const _id = '610007e7604ebb2c6bf20454';
    const itensSold = [{ productId: '5f43cbf4c45ff5104986e81d', quantity: 2 }];
    before(() => {
      sinon.stub(salesModel, 'getIdSales').resolves(itensSold);
    })
    after(() => salesModel.getIdSales.restore())
    it('retorna um objeto', async() => {
      const [response] = await salesService.getSalesId(_id);
      expect(response).to.be.an('object')
    })
    it('verifica se o object tem as props: productId, quantity', async() => {
      const [response] = await salesService.getSalesId(_id);
      expect(response).to.include.all.keys('productId', 'quantity');
    })
  })
})

describe('Testa a edição de vendas', () => {
  describe('atualiza produto', () => {
    const _id = '610007e7604ebb2c6bf20454';
    const itensSold = [{ productId: '610be0981fabee2a9551e268', quantity: 2 }];
    const newItens = [{ productId: '610be0981fabee2a9551e268', quantity: 1 }];

    before(() => {
      const ID_EXAMPLE = '610007e7604ebb2c6bf20454';
      sinon.stub(salesModel, 'editSale').resolves({_id,itensSold});
    });

    after(() => {
      salesModel.editSale.restore();
    });

    it('testa se retorna um objeto', async () => { 
      const [response] = await salesService.editSale(_id, itensSold)
      expect(response).to.be.an('object');
    })
  })
})

describe('testa se uma venda é deletada com sucesso', () => {
  const _id = '610007e7604ebb2c6bf20454';
  before(() => {
    sinon.stub(salesModel,'deleteSale').resolves(_id)
  });
  after(() => salesModel.deleteSale.restore());
  it('testa se o produto é removido com sucesso', async () => {
    const [response] = await salesService.deleteSale(_id)
    const removeID = await salesService.getSalesId(response)
    expect(removeID).to.be.null;
  });
})
