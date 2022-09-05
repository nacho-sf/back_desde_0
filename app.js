// Importación de módulos externos
const express = require('express')  //Importación de Express
const fetch = require("node-fetch"); // ¿Importación de Fetch?

//Importación de rutas
const productsRoutes = require("./routes/productsRoutes");
const productsApiRoutes = require("./routes/productsApiRoutes");

// Importación de módulos internos
const manage404 = require('./middlewares/error404'); //Middleware

const app = express()               //Declaración de Express
const port = 3000                   //Declaración del puerto

app.set('view engine', 'pug'); // Establece el motor de vistas usado ('pug')
app.set('views','./views');    // Ruta donde se guardan las vistas

app.use(express.json()); // Para escribir en el body



// Inicialización de las rutas de productos: WEB
app.use("/products", productsRoutes);
//Con middleware de acceso para TODAS las rutas "/products" sería:
//app.use("/products", checkApiKey, productsRoutes);

// Inicialización de las rutas (Router) de productos: API
app.use("/api/products", productsApiRoutes);


// Middleware de error 404 (Respuesta por defecto para rutas no existentes)
app.use(manage404);


//Apertura del puerto
app.listen(port, () => {
  console.log(`El servidor funciona en el puerto ${port}`)
})