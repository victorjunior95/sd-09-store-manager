const { expect } = require('chai');
// const chaiAsPromised = require('chai-as-promised');

// chai.use(chaiAsPromised);
// const expect = chai.expect;

const { registerProductService } = require('../../services/registerProductService')


describe('Quando insere um novo produto', () => {
    
    describe('Os dados enviados são invalidos', () => {
        it('deve retornar um error', async () => {     
            const result = await registerProductService('name', 'num').catch((err) => err)
            expect(result).to.be.rejected;
        });

        it('deve ter status 422', async () => {     
           try {
            const result = await registerProductService('nam', 'nu')
           } catch (error) {
            expect(error).have.property('status', 422)           
           }
        });
    });

    describe('Produto inserido com sucesso', () => {
        it('deve retornar um objeto', async () => {
            const result = await registerProductService('Bola de fut', 20)
            expect(result).to.be.a('object')
        })
    })
})