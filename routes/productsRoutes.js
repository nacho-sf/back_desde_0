const express = require('express'); //Importación de Express

//Importación del controlador
const productsController = require("../controllers/productsController")

const productsRouter = express.Router(); //Inicialización del router


// GET: http://localhost:3000/products
productsRouter.get('/:id?', productsController.getProducts);

// POST: http://localhost:3000/products
//productsRouter.post('/', productsController.createProduct);

// DELETE: http://localhost:3000/products
//productsRouter.delete("/", productsController.deleteProduct);


module.exports = productsRouter; //Exportación del router