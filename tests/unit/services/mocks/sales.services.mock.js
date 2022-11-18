const sales = [
  {
    "productId": 1,
    "quantity": 2
  },
  {
    "productId": 2,
    "quantity": 1
  }
];

const returnSales = {
  "id": 4,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
}

const requestSales = [
  { id: 4, productId: 1, quantity: 2 },
  { id: 4, productId: 2, quantity: 1 }
];

const wrongSale = [
  {
    "productId": 999,
    "quantity": 2
  },
]

module.exports = {
  sales,
  returnSales,
  requestSales,
  wrongSale
}