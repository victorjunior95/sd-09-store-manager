class CreateSaleService {
  constructor(productModel, saleModel) {
    this.productModel = productModel;
    this.saleModel = saleModel;
  }
  async execute(itens) {
    const promises = itens.map(async ({ productId, quantity }) => {
      const product = await this.productModel.findById(productId);
      const minimunOfProducts = 0;
      if (product.quantity - quantity < minimunOfProducts) {
        throw new Error();
      }
      await this.productModel.updateQuantity(productId, -quantity);
    });
    await Promise.all(promises);
    const createdSale = await this.saleModel.save(itens);
    return createdSale;
  }
}

module.exports = CreateSaleService;
