const CreateSaleService = require('../../services/createSaleService');

describe('Deve criar uma venda', () => {
  const productModelMock = {
    findById: (id) => ({ quantity: 2 }),
    updateQuantity: () => {},
  };
  const saleModelMock = {
    save: () => {},
  };
  const createSaleService = new CreateSaleService(productModelMock, saleModelMock);
  createSaleService.execute([
    { productId: 123, quantity: 4 },
    { productId: 123, quantity: 1 },
  ]);
});
