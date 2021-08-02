const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../models/Product');
const saleModel = require('../../models/Sale');
const productService = require('../../services/Product');
const saleService = require('../../services/Sale');

describe('Ao lidar com produtos', () => {
  describe('Criar um produto novo', async () => {
    const product1 = { name: 'Produto 1', quantity: 10 };
    const product2 = { name: 'Produto 2', quantity: 10 };

    before(() => {
      const _id = '61075b6614489648e606c100';
      sinon.stub(productModel, 'create').resolves({ _id });
    });

    after(() => {
      productModel.create.restore();
    });

    it('deve ser um objeto', async () => productService.create(product1)
      .then((res) => expect(res).to.be.an('object')));
  });
});

describe('Listar todos os produtos', () => {
  describe('Quando não tem produtos cadastrados', () => {
    before(() => {
      sinon.stub(productModel, 'getAll').resolves([]);
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('Deve ser um array', () => productService.getAll()
      .then(({ products }) => expect(products).to.be.an('array')));

    it('Deve ser um array vazio', () => productService.getAll()
      .then(({ products }) => expect(products).to.be.empty));
  });

  describe('Quando tem produtos cadastrados', () => {
    before(() => {
      sinon.stub(productModel, 'getAll').resolves({
        products: [
          { _id: '61075b6614489648e606c100', name: 'Produto 1', quantity: 10 },
          { _id: '61075b6614489648e606c100', name: 'Produto 2', quantity: 10 }
        ]
      });
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('Deve ser um objeto', () => productService.getAll()
      .then((products) => expect(products).to.be.an('object')));

    it('O objeto não deve estar vazio', () => productService.getAll()
      .then(({ products }) => expect(products).to.not.be.empty));
  });
});

describe('Buscar um produto pelo seu ID', () => {
  describe('Quando não tem produtos cadastrados', () => {
    before(() => {
      sinon.stub(productModel, 'findById').resolves(null);
    });

    after(() => {
      productModel.findById.restore();
    });

    it('Deve retornar um objeto', () => productService.findById()
      .then((res) => expect(res).to.be.an('object')));
  });

  describe('Quando temos produtos cadastrados', () => {
    const _id = '61075b6614489648e606c100';
    const product = { _id: _id, name: 'Produto 1', quantity: 10 }
    before(() => {
      sinon.stub(productModel, 'findById').resolves(product);
    });

    after(() => {
      productModel.findById.restore();
    });

    it('Deve ser um objeto', () => productService.findById(_id)
      .then((res) => expect(res).to.be.an('object')));

    it('Deve ter as propriedades: id, name e quantity', () => productService.findById(_id)
      .then((res) => expect(res).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Editar um produto', () => {
  describe('Ao editar um produto', () => {
    const _id = '61075b6614489648e606c100';
    const product = { name: 'Produto 1', quantity: 10 };
    const editedProduct = { name: 'Produto 1', quantity: 7 };

    before(() => {
      sinon.stub(productModel, 'edit').resolves({ _id, product });
    });

    after(() => {
      productModel.edit.restore();
    });

    it('Deve retornar um objeto', () => productService.edit(_id, product)
      .then((res) => expect(res).to.be.an('object')));
  });
});

describe('Deletar um produto', () => {
  describe('Ao deletar', () => {
    const _id = '61075b6614489648e606c100';

    before(() => {
      sinon.stub(productModel, 'deleteOne').resolves({ id: _id });
    });

    after(() => {
      productModel.deleteOne.restore();
    });

    it('Deve deletar', () => productService.deleteOne(_id)
      .then(() => productService.findById(_id)
        .then((res) => expect(res).to.be.an('object'))));
  });
});

describe('Ao lidar com vendas', () => {
  describe('Criar uma venda', async () => {
    const _id = '61075b6614489648e606c100';
    const itensSold = [{ productId: '61075b6614489648e606c100', quantity: 2 }];

    before(() => {
      sinon.stub(saleModel, 'create').resolves({ _id, itensSold });
    });

    after(() => {
      saleModel.create.restore();
    });

    it('Deve retornar um objeto', async () => saleService.create(itensSold)
      .then((res) => expect(res).to.be.an('object')));
  });
});

describe('Listar todas as vendas', () => {
  describe('Quando não tem vendas cadastradas', () => {
    before(() => {
      sinon.stub(saleModel, 'getAll').resolves([]);
    });

    after(() => {
      saleModel.getAll.restore();
    });

    it('Deve ser um array', () => saleService.getAll()
      .then(({ sales }) => expect(sales).to.be.an('array')));

    it('Deve ser um array vazio', () => saleService.getAll()
      .then(({ sales }) => expect(sales).to.be.empty));
  });

  describe('Quando temos vendas cadastradas', () => {
    before(() => {
      sinon.stub(saleModel, 'getAll').resolves({
        sales: [
          { _id: '61075b6614489648e606c100', itensSold: [{ productId: '61075bba06c8695ebd1f3734', quantity: 1 }] },
          { _id: '61075b6614489648e606c100', itensSold: [{ productId: '61075bba06c8695ebd1f3734', quantity: 1 }] }
        ]
      });
    });

    after(() => {
      saleModel.getAll.restore();
    });

    it('Deve ser um objeto', () => saleService.getAll()
      .then(({ sales }) => expect(sales).to.be.an('object')));
  });
});

describe('Buscar um venda por sua ID', () => {
  describe('Quando não tem vendas cadastradas', () => {
    before(() => {
      sinon.stub(saleModel, 'findById').resolves(null);
    });

    after(() => {
      saleModel.findById.restore();
    });

    it('Deve retornar erro', () => saleService.findById()
      .then((res) => expect(res).to.be.an('object')));
  });

  describe('Quando tem vendas cadastradas', () => {
    const _id = '61075b6614489648e606c100';
    const itensSold = [{ productId: '61075bba06c8695ebd1f3734', quantity: 1 }];
    before(() => {
      sinon.stub(saleModel, 'findById').resolves(itensSold);
    });

    after(() => {
      saleModel.findById.restore();
    });

    it('Deve ser um array', () => saleService.findById(_id)
      .then((res) => expect(res).to.be.an('array')));
  });
});

describe('Editar uma venda', () => {
  describe('Ao editar uma venda', () => {
    const _id = '61075b6614489648e606c100';
    const itensSold = [{ productId: '61075bba06c8695ebd1f3734', quantity: 2 }];
    const itensSoldEdited = [{ productId: '61075bba06c8695ebd1f3734', quantity: 1 }];

    before(() => {
      sinon.stub(saleModel, 'edit').resolves({ _id, itensSold });
    });

    after(() => {
      saleModel.edit.restore();
    });

    it('Deve retornar o objeto editado', () => saleService.edit(_id, itensSold)
      .then((res) => expect(res).to.be.an('object')));
  });
});

describe('Deletar uma venda', () => {
  describe('Ao deletar uma venda', () => {
    const _id = '61075b6614489648e606c100';
    const itensSold = [{ productId: '61075bba06c8695ebd1f3734', quantity: 1 }];

    before(() => {
      sinon.stub(saleModel, 'deleteOne').resolves({ _id, itensSold });
    });

    after(() => {
      saleModel.deleteOne.restore();
    });

    it('Deve deletar', () => saleService.deleteOne(_id)
      .then(() => saleService.findById(_id)
        .then((res) => expect(res).to.be.an('object'))));
  });
});