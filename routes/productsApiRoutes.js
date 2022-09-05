const express = require('express');

// (API) RUTAS DE PRODUCTOS
const productsApiController = require("../controllers/productsApiController")
const productsApiRouter = express.Router();



// Products API

// GET: http://localhost:3000/api/products
productsApiRouter.get('/:id?', productsApiController.getProducts);
  
// POST: http://localhost:3000/api/products
productsApiRouter.post('/', productsApiController.createProduct);

// DELETE: http://localhost:3000/api/products
productsApiRouter.delete("/", productsApiController.deleteProduct);

module.exports = productsApiRouter;