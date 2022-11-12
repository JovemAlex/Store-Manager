const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productServices } = require('../../../src/services');
const productsController = require('../../../src/controllers/products.controller');

const {
  happyControllerResponseGetByIdProducts,
  happyResponseByIdProducts,
} = require("./mocks/products.controller.mock");

describe('Teste de unidade do controller de products', function () {
  describe('Recupera a lista de todos os produtos', function () {
    it('Lista todos os produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();

      sinon
        .stub(productServices, 'getAll')
        .resolves({ type: null, message: [] });
      
      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });
  });

  describe('Rescupera produto a partir do ID', function () {
    it('Lista produto com ID equivalente', async function () {
      const res = {};
      const req = {
        params: {
          id: 1
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productServices, "getById")
        .resolves(happyControllerResponseGetByIdProducts);
      
      
      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(happyResponseByIdProducts);
    });
  });
});