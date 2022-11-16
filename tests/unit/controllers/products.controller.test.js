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
  happyControllerResponseCreateProduct,
  happyResponseCreateProduct,
  happyResponseUpdateProduct,
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

    it('Retorna um erro ao não encontrar os produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();

      sinon
        .stub(productServices, 'getAll')
        .resolves({ type: 'LIST_NOT_FOUND', message: 'List not found' });
      
      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });
    afterEach(sinon.restore);
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
        .stub(productServices, 'getById')
        .resolves(happyControllerResponseGetByIdProducts);
      
      
      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(happyResponseByIdProducts);
    });
    
    it('Retorna um erro ao passar um ID inexistente', async function () {
      const res = {};
      const req = {
        params: {
          id: 10,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productServices, 'getById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      
      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });
    afterEach(sinon.restore);
  });

  describe('Criação de um novo produto', function () {
    afterEach(sinon.restore);
    it('produto é criado corretamente', async function () {
      const res = {};
      const req = {
        body: {
          name: "teste",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productServices, 'createProduct')
        .resolves(happyControllerResponseCreateProduct);
      
      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
    });

    it('Retorna um erro ao passar um nome inválido', async function () {
      const res = {};
      const req = {
        body: {
          name: 1,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productServices, 'createProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"value" must be a string' });
      
      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"value" must be a string' });
    });
  });

  describe('Edita um produto', function () {
    afterEach(sinon.restore);
    it('Edita um produto com sucesso', async function () {
      const res = {};
      const req = {
        params: {
          id: 1
        },
        body: {
          name: 'Martelo do Batman',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productServices, 'updateProduct')
        .resolves(happyResponseUpdateProduct);
      
      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });

    it('Retorna um erro ao passar um ID inexistente', async function () {
      const res = {};
      const req = {
        params: {
          id: 80
        },
        body: {
          name: 'Martelo do Batman',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productServices, 'updateProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Deleta um produto', function () {
    afterEach(sinon.restore);
    it('deleta um produto corretamente', async function () {
      sinon
        .stub(productServices, 'deleteProduct')
        .resolves({ type: null });

        const res = {};
        const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.calledWith();
    });

    it('retorna um erro ao tentar deletar o produto inexistente', async function () {
      sinon
        .stub(productServices, 'deleteProduct')
        .returns({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      const res = {};
      const req = { params: { id: 10 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith('PRODUCT_NOT_FOUND');
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(sinon.restore);
});