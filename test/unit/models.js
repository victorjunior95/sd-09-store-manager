const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectID } = require('mongodb');

const connectionUri = require('./connection');
const products = require('../../models/Product');
const sales = require('../../models/Sale');

describe('Ao lidar com os produtos', () => {
  let connect;
  const product1 = { name: 'Produto 1', quantity: 10 };

  before(async () => {
    connect = await connectionUri();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    await connect.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('Criar um produto', () => {
    it('deve ser um objeto', () => products.create(product1)
      .then((res) => expect(res).to.be.an('object')));

    it('deve ter as propriedades: id, name e quantity', () => products.create(product1)
      .then((res) => expect(res).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('listar todos os produtos', () => {
  let connect;
  const product1 = { name: 'Produto 1', quantity: 10 };

  before(async () => {
    connect = await connectionUri();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('quando não tem produtos cadastrados', () => {
    it('deve ser um array', () => products.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('deve ser um array vazio', () => products.getAll()
      .then((res) => expect(res).to.be.empty));
  });

  describe('quando tem produtos cadastrados', () => {
    before(async () => {
      await connect.db('StoreManager').collection('products').insertOne(product1);
    });

    after(async () => {
      await connect.db('StoreManager').collection('products').deleteMany({});
    });

    it('deve ser um array', () => products.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('deve ser um array de objetos', () => products.getAll()
      .then(([item]) => expect(item).to.be.an('object')));

    it('deve conter as propriedades: id, name e quantity', () => products.getAll()
      .then(([item]) => expect(item).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Buscar um produto pelo seu ID', () => {
  let connect;
  const ID = ObjectID('6106028770433b843dcda6cb');
  const product1 = { _id: ID, name: 'Produto 1', quantity: 10 };

  before(async () => {
    connect = await connectionUri();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando não tem produtos cadastrados', () => {
    it('deve retornar nulo', () => products.findById()
      .then((res) => expect(res).to.be.null));
  });

  describe('quando temos produtos cadastrados', () => {
    before(async () => {
      await connect.db('StoreManager').collection('products').insertOne(product1);
    });

    after(async () => {
      await connect.db('StoreManager').collection('products').deleteMany({});
    });

    it('deve ser um objeto', () => products.findById(ID)
      .then((res) => expect(res).to.be.an('object')));

    it('deve ter as propriedades: id, name e quantity', () => products.findById(ID)
      .then((res) => expect(res).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Atualizar um produto', () => {
  let connect;
  const _id = ObjectID('6106028770433b843dcda6cb');
  const product1 = { name: 'Produto 1', quantity: 10 };
  const product1Edited = { name: 'Produto 1', quantity: 7 };

  before(async () => {
    connect = await connectionUri();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    await connect.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('Ao atualizar o produto', () => {
    before(async () => {
      await connect.db('StoreManager').collection('products').insertOne({ _id, product1 });
    });

    after(async () => {
      await connect.db('StoreManager').collection('products').deleteMany({});
    });

    it('deve retornar um objeto', () => products.edit(_id, product1Edited)
      .then((res) => expect(res).to.be.an('object')));

    it('deve ter as propriedades: id, name e quantity', () => products.edit(_id, product1Edited)
      .then((res) => expect(res).to.include.all.keys('_id', 'name', 'quantity')));
  });
});

describe('Deletar um produto', () => {
  let connect;
  const _id = ObjectID('6106028770433b843dcda6cb');
  const product1 = { _id, name: 'Produto 1', quantity: 10 };

  before(async () => {
    connect = await connectionUri();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    await connect.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('quando deletar', () => {
    before(async () => {
      await connect.db('StoreManager').collection('products').insertOne(product1);
    });

    after(async () => {
      await connect.db('StoreManager').collection('products').deleteMany({});
    });

    it('deve retornar nulo ao ser procurado', () => products.deleteOne(_id)
      .then(() => products.findById(_id)
        .then((res) => expect(res).to.be.null)));
  });
});

describe('Ao criar uma venda', () => {
  let connect;
  const soldProducts = [{ productId: '6106028770433b843dcda6cb', quantity: 2 }];

  before(async () => {
    connect = await connectionUri();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    await connect.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('Quando uma venda é criada', () => {
    it('deve ser um array', () => sales.create(soldProducts)
      .then((res) => expect(res).to.be.an('object')));

    it('deve conter objetos com as propriedades: id, name, quantity', () => sales.create(soldProducts)
      .then((res) => expect(res).to.include.all.keys('_id', 'itensSold')));
  });
});

describe('Lista todas as vendas', () => {
  let connect;
  const soldProducts = [{ productId: '6106028770433b843dcda6cb', quantity: 2 }];

  before(async () => {
    connect = await connectionUri();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando não tem vendas cadastradas', () => {
    it('deve retornar um array', () => sales.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('deve ser um array vazio', () => sales.getAll()
      .then((res) => expect(res).to.be.empty));
  });

  describe('Quando tem vendas cadastradas', () => {
    before(async () => {
      await connect.db('StoreManager').collection('sales').insertOne({ soldProducts });
    });

    after(async () => {
      await connect.db('StoreManager').collection('sales').deleteMany({});
    });

    it('deve ser um array', () => sales.getAll()
      .then((res) => expect(res).to.be.an('array')));

    it('deve ser um array de objetos', () => sales.getAll()
      .then(([item]) => expect(item).to.be.an('object')));
  });
});

describe('Busca uma venda pela sua ID', () => {
  let connect;
  const _id = ObjectID('610007c2604ebb2c6bf20453');
  const soldProducts = [{ productId: '6106028770433b843dcda6cb', quantity: 2 }];

  before(async () => {
    connect = await connectionUri();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando não tem vendas cadastradas', () => {
    it('deve retornar nulo', () => sales.findById()
      .then((res) => expect(res).to.be.null));
  });

  describe('QUando a venda esta cadastrada', () => {
    before(async () => {
      await connect.db('StoreManager').collection('sales').insertOne({ _id, soldProducts });
    });

    after(async () => {
      await connect.db('StoreManager').collection('sales').deleteMany({});
    });

    it('deve retornar um objeto', () => sales.findById(_id)
      .then((res) => expect(res).to.be.an('object')));
  });
});

describe('QUando uma venda for editada', () => {
  let connect;
  const _id = ObjectID('610007c2604ebb2c6bf20453');
  const soldProducts = [{ productId: '6106028770433b843dcda6cb', quantity: 2 }];
  const newProducts = [{ productId: '6106028770433b843dcda6cb', quantity: 1 }];

  before(async () => {
    connect = await connectionUri();
    sinon.stub(MongoClient, 'connect').resolves(connect);
  });

  after(async () => {
    await connect.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('Quando atualizar', () => {
    before(async () => {
      await connect.db('StoreManager').collection('sales').insertOne({ _id, soldProducts });
    });

    after(async () => {
      await connect.db('StoreManager').collection('sales').deleteMany({});
    });

    it('deve retornar um objeto', () => sales.edit(_id, soldProducts)
      .then((res) => expect(res).to.be.an('object')));

    it('deve ter alterado com sucesso', () => sales.edit(_id, newProducts)
      .then((res) => expect(res).to.include.all.keys('_id', 'itensSold')));
  });
});

// describe('Deve deletar uma venda', () => {
//   let connect;
//   const _id = ObjectID('610007c2604ebb2c6bf20453');
//   const soldProducts = [{ productId: '6106028770433b843dcda6cb', quantity: 2 }];
//   const newProducts = [{ productId: '6106028770433b843dcda6cb', quantity: 1 }];

//   before(async () => {
//     connect = await connectionUri();
//     sinon.stub(MongoClient, 'connect').resolves(connect);
//   });

//   after(async () => {
//     await connect.db('StoreManager').collection('sales').deleteMany({});
//     MongoClient.connect.restore();
//   });

//   describe('Quando atualizar', () => {
//     before(async () => {
//       await connect.db('StoreManager').collection('sales').insertOne({ _id, soldProducts });
//     });

//     after(async () => {
//       await connect.db('StoreManager').collection('sales').deleteMany({});
//     });

//     it('deve retornar um objeto', () => sales.deleteOne(_id)
//       .then((res) => expect(res).to.be.an('object')));

//     it('deve retornar a venda deletada', () => sales.edit(_id, newProducts)
//       .then((res) => expect(res).to.include.all.keys('_id', 'itensSold')));
//   });
// });