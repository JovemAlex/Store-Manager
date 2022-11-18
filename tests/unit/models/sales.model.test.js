const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales, returnSales } = require('./mocks/sales.model.mock');

describe('Teste de unidade do model de sales', function () {
  describe('Cadastra um venda', function () {
    afterEach(sinon.restore);
    it('venda foi cadastrada com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves(returnSales);

      const result = await Promise.all(sales.map(async (sale) => salesModel.createSale(4, sale)));

      expect(result).to.be.deep.equal(returnSales);
    });

    it('O id é correto é buscado', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const result = await salesModel.insertSale();

      expect(result).to.equal(4);
    });
  });
});