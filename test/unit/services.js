const sinon = require('sinon');
const { expect } = require('chai');
const ProductsService = require('../../services/ProductsService');
const ProductsModel = require('../../models/ProductsModel');
const SalesService = require('../../services/SalesService');
const SalesModel = require('../../models/SalesModel');

// PRODUCTS

describe('Function getAllProducts', () => {
  describe('quando nao existir produtos cadastrados', () => {
    const mockProduct = []
  
    before(async () => {
      sinon.stub(ProductsModel, 'getAllProducts')
        .resolves(mockProduct);
    });
  
    after(async () => {
      ProductsModel.getAllProducts.restore();
    });

    it('retorna um Array', async () => {
      const response = await ProductsService.getAllProducts();

      expect(response).to.be.an('array');
    })

    it('o Array [e vazio', async () => {
      const response = await ProductsService.getAllProducts();

      expect(response).to.be.empty;
    })
  })
});

describe('Function findById', () => { 
  describe('quando achar um produto com ID', () => {
    const mockProduct = {
      name: 'Cerveja',
      quantity: 10
    }
  
    before(async () => {
      sinon.stub(ProductsModel, 'findById')
        .resolves(mockProduct);
    });
  
    after(async () => {
      ProductsModel.findById.restore();
    });

    it('retorna um object', async () => {
      const response = await ProductsService.findById(mockProduct);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function createProduct', () => {
  describe('quando criar um produto no banco', () => {
    const mockProduct = {
      _id: '60e72ce912fb02363cd340e4',
      name: 'Cerveja',
      quantity: 10
    }
  
    before(async () => {  
      sinon.stub(ProductsModel, 'createProduct')
        .resolves(mockProduct);
    });
  
    after(async () => {
      ProductsModel.createProduct.restore();
    });

    it('retorna um object', async () => {
      const response = await ProductsService.createProduct(mockProduct);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function editProduct', () => {
  describe('quando edita um produto com ID', () => {
    const mockProduct = {
      name: 'Cerveja',
      quantity: 10
    }
    const id = '60e72ce912fb02363cd340e4';
  
    before(async () => {  
      sinon.stub(ProductsModel, 'editProduct')
        .resolves(mockProduct);
    });
  
    after(async () => {
      ProductsModel.editProduct.restore();
    });

    it('retorna um object', async () => {
      const response = await ProductsService.editProduct(id, mockProduct);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function deleteProduct', () => {
  describe('deleta um produto com ID', () => {
    const id = '60e72ce912fb02363cd340e4';
  
    before(async () => {  
      sinon.stub(ProductsModel, 'deleteProduct')
        .resolves(null);
    });
  
    after(async () => {
      ProductsModel.deleteProduct.restore();
    });

    it('retorna um object', async () => {
      const response = await ProductsService.deleteProduct(id);

      expect(response).to.be.null;
    })
  });
});

describe('Function buyProduct', () => {
  describe('decrementa o banco products quando faz compra', () => {
    const id = '60e72ce912fb02363cd340e4';
    const quantity = 2

    const mockProduct = {
      name: 'Cerveja',
      quantity: 8
    }
  
    before(async () => {  
      sinon.stub(ProductsModel, 'buyProduct')
        .resolves(mockProduct);
    });
  
    after(async () => {
      ProductsModel.buyProduct.restore();
    });

    it('retorna um object', async () => {
      const response = await ProductsService.buyProduct(id, quantity);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function deleteSale', () => {
  describe('incremente o banco products quando deleta compra', () => {
    const id = '60e72ce912fb02363cd340e4';
    const quantity = 2

    const mockProduct = {
      name: 'Cerveja',
      quantity: 10
    }
  
    before(async () => {  
      sinon.stub(ProductsModel, 'deleteSale')
        .resolves(mockProduct);
    });
  
    after(async () => {
      ProductsModel.deleteSale.restore();
    });

    it('retorna um object', async () => {
      const response = await ProductsService.deleteSale(id, quantity);

      expect(response).to.be.an('object');
    })
  });
});

// // SALES

describe('Function createSales', () => {
  describe('quando criar um produto no banco', () => {
    const mockProduct = [
      {
        productId: '60e72ce912fb02363cd340e4',
        quantity: 10
      }
    ];

    const mockSale = {
      insertedId: '60e72ce912fb02363cd340e4',
      itensSold: mockProduct
    };
  
    before(async () => {  
      sinon.stub(SalesModel, 'createSales')
        .resolves(mockSale);
    });
  
    after(async () => {
      SalesModel.createSales.restore();
    });

    it('retorna um object', async () => {
      const response = await SalesService.createSales(mockProduct);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function getAllSales', () => {
  describe('quando nao tem compras no banco', () => {
    it('retorna um array', async () => {
      const response = await SalesService.getAllSales();

      expect(response).to.be.an('array');
    })

    it('o Array [e vazio', async () => {
      const response = await SalesService.getAllSales();

      expect(response).to.be.empty;
    })
  });

  describe('quando tem compras no banco', () => {
     it('retorna um array', async () => {
      const response = await SalesService.getAllSales();

      expect(response).to.be.an('array');
    })
  });
});

describe('Function findById', () => {
  describe('quando nao achar nenhum produto com ID', () => {
    const mockSale = {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };

    const id = '60e72ce912fb02363cd340e4';
  
    before(async () => {  
      sinon.stub(SalesModel, 'findById')
        .resolves(mockSale);
    });
  
    after(async () => {
      SalesModel.findById.restore();
    });

    it('retorna um object com erro', async () => {
      const response = await SalesService.findById(id);

      expect(response).to.be.an('object');
    })
  });
  
  describe('quando achar um produto com ID', () => {
    const mockProduct = [
      {
        productId: '60e72ce912fb02363cd340e4',
        quantity: 10
      }
    ];

    const mockSale = {
      insertedId: '60e72ce912fb02363cd340e4',
      itensSold: mockProduct
    };

    const id = '60e72ce912fb02363cd340e4';
  
    before(async () => {  
      sinon.stub(SalesModel, 'findById')
        .resolves(mockSale);
    });
  
    after(async () => {
      SalesModel.findById.restore();
    });

    it('retorna um object', async () => {
      const response = await SalesService.findById(id);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function editSale', () => { 
  describe('edita um produto com ID', () => {
    const mockProduct = [
      {
        productId: '60e72ce912fb02363cd340e4',
        quantity: 10
      }
    ];

    const mockSale = {
      insertedId: '60e72ce912fb02363cd340e4',
      itensSold: mockProduct
    };

    const id = '60e72ce912fb02363cd340e4';
  
    before(async () => {  
      sinon.stub(SalesModel, 'editSale')
        .resolves(mockSale);
    });
  
    after(async () => {
      SalesModel.editSale.restore();
    });

    it('retorna um object', async () => {
      const response = await SalesService.editSale(id, mockProduct);

      expect(response).to.be.an('object');
    })
  });
});

describe('Function deleteProduct', () => {
  describe('deleta um produto com ID', () => {
    const mockProduct = [
      {
        productId: '60e72ce912fb02363cd340e4',
        quantity: 10
      }
    ];

    const mockSale = {
      insertedId: '60e72ce912fb02363cd340e4',
      itensSold: mockProduct
    };

    const id = '60e72ce912fb02363cd340e4';
  
    before(async () => {  
      sinon.stub(SalesModel, 'editSale')
        .resolves(null);
    });
  
    after(async () => {
      SalesModel.editSale.restore();
    });

    it('retorna um object', async () => {
      const response = await SalesService.deleteSale(id);

      expect(response).to.be.an('object');
    })
  });
});
