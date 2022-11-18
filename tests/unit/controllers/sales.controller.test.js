const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { responseSales } = require('./mocks/sales.controller.mock');

const { salesServices } = require('../../../src/services');
const salesController = require('../../../src/controllers/sales.controller');

describe('Teste de unidade do controller de sales', function () {
  describe('Cadastra novas vendas', function () {
    afterEach(sinon.restore);
    it('venda foi cadastrada com sucesso', async function () {
      const res = {};
      const req = {
        body: [
          {
            "productId": 1,
            "quantity": 2
          },
          {
            "productId": 2,
            "quantity": 1
          },
        ]
      }

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();

      sinon
        .stub(salesServices, 'createSale')
        .resolves(responseSales);
      
      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
    });

    it('retorna um erro com id inexistente', async function () {
      const res = {};
      const req = {
        body: [
          {
            "productId": 999,
            "quantity": 2
          },
          {
            "productId": 2,
            "quantity": 1
          },
        ]
      }

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();

      sinon
        .stub(salesServices, 'createSale')
        .resolves({ type: 404, message: 'Product not found'});
      
      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});