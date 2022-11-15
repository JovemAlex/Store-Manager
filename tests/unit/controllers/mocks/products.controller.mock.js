//GET BY ID:

const happyControllerResponseGetByIdProducts = {
  type: null,
  message: {
    id: 1,
    name: "Martelo de Thor",
  },
};

const happyResponseByIdProducts = {
  id: 1,
  name: "Martelo de Thor",
};

// CREATE PRODUCTS:

const happyControllerResponseCreateProduct = {
  type: null,
  message: {
    id: 4,
    name: "teste",
  },
};

const happyResponseCreateProduct = {
  id: 4,
  name: "teste",
};

// EDIT PRODUCT

const happyResponseUpdateProduct = {
  id: 1,
  name: "Martelo do Batman"
}

module.exports = {
  happyControllerResponseGetByIdProducts,
  happyResponseByIdProducts,
  happyControllerResponseCreateProduct,
  happyResponseCreateProduct,
  happyResponseUpdateProduct
};