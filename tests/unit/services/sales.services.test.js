const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesServices } = require('../../../src/services');

const { sales, requestSales, wrongSale } = require('./mocks/sales.services.mock');

describe('Teste de unidade do service de sales', function () {
  describe('Cadastra vendas', function () {
    afterEach(sinon.restore);

    it('as vendas foram cadastradas com sucesso', async function () {
      sinon.stub(salesModel, 'createSale').resolves(requestSales);

      const result = await salesServices.createSale(sales);

      expect(result.type).to.be.equal(null);
    });

    it('não é possível adicionar uma venda com o productId inexistente', async function () {
      sinon.stub(salesModel, 'createSale').resolves(undefined);

      const result = await salesServices.createSale(wrongSale);

      expect(result.type).to.be.equal(404);
      expect(result.message).to.be.equal('Product not found');
    });
  });
});