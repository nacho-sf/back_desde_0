# back_desde_0







      //// INICIALIZANDO UN PROYECTO BACK ////


-Se crea un nuevo proyecto de github con un readme y la opción de añadir gitignore para Node (node_modules puede ocupar mucho espacio y no se sube de forma predeterminada a github).

-Esta carpeta se abre en local con Visual Code y se crea la subcarpeta "assets" y el archivo principar del proyecto (ej: app.js)

-Para crear carpetas por consola: mkdir "nombre_carpeta"

-Para crear archivos por consola: touch "nombre_archivo.extensión"

-Se abre la terminal y se escribe "npm init" para inicializar un proyecto con Node.

-Con esto se crea el archivo "packaje.json" e irá apareciendo la configuración para introducir (nombre, versión, descripción, main-> punto de entrada al proyecto (ej: app.js)...)

-Instalar el módulo Express. Terminal "npm i express". Se crea automáticamente el archivo package-lock.json y la carpeta node_modules, que son las librerias que usa express para funcionar.

-Se escribe en "app.js" las declaraciones:


const express = require('express')  //Importación de Express
const app = express()               //Declaración de Express
const port = 3000                   //Declaración del puerto

. . . .

app.listen(port, () => {            //Apertura del puerto
  console.log(`El servidor funciona en el puerto ${port}`)
})


-Lanzar el servidor. Terminal "node app.js". Si no funciona, puede que haya que cambiar el puerto. En el navegador se podrá ver si funciona el servidor escribiendo "http://localhost:3000"

-Para apagar el servidor pulsar "ctrl C"

-Para arrancar el servidor con la declaración "start" hay que escribirlo en "package.json", dentro del objeto "scripts": ("start": "node app.js")

-Instalamos Nodemon --> "npm i --save-dev nodemon" para refrescar automáticamente al guardar.

-Se creará en "package.json" "devDependencies" (ahí veremos nodemon instalado), que es donde irán todas las dependencias de desarrollo en un entorno de pruebas.

-Comando "npm list" para ver las cosas que están instaladas.

-Para arrancar el servidor con nodemon se crea en "scripts" la declaración "dev" (development) tal que así: "dev": "nodemon app.js".

-Se habilita una ruta/controlador en app.js para probar el servidor:
// http://localhost:3000

app.get('/', (req, res) => {
    let msj = 'Hola desde mi primer servidor!';
    res.send(msj);
});


-Para trabajar más cómodo separar las pantallitas de la terminal de comandos del visualcode. La terminal de la izquierda será para iniciar el servidor y ver los mensajes que lanza por consola. La de la derecha para instalar cosas.

-Instalar PUG: "npm i pug". Como PUG es una dependencia del proyecto(dependencies), y no de desarollo(devDependencies, para hacer pruebas) Usamos "npm i pug" y no "npm install --save pug"

-Se crea la carpeta "views" y dentro de esta irán los templates de PUG. Crear un template, dentro de la carpeta views, que se llame: my_view.pug y escribir dento el siguiente código:

doctype html
html
   head
      title = "Hello Pug"
   body
      p.greetings#people Mi primera plantilla!


-Se escribime en app.js:

app.set('view engine', 'pug'); // Establece el motor de vistas usado ('pug')
app.set('views','./views');    // Ruta donde se guardan las vistas


-Se habilita una ruta/controlador en app.js para probar el renderizado de la  plantilla en html:
// http://localhost:3000

app.get('/', (req, res) => {
    let msj = 'Hola desde mi primer servidor!';
    // Renderizado en html ("template",{objeto que le pasamos a la plantilla})
    res.render("my_view",{section:"Home", msj}); 
});



-Para leer lo que le hemos pasado a la plantilla, se escribe en my_view.pug:

doctype html
html
   head
        title = "Hello Pug"
   body
    h1 Estás en la #{section}  <---------------------- Escribir!
    p.greetings#people Mi primera plantilla!
    p #{msj}  <--------------------------------------- Escribir!














      //// PETICIONES A API's EXTERNAS ////



-Instalar POSTMAN (registro o Log con Google)

-Instalar fetch: "npm install node-fetch@2" (@2: versión anterior que funciona)

-Importar el módulo en app.js: const fetch = require("node-fetch");

-Para escribir en el body (POST), se escribe bajo el motor de vistas de PUG: "app.use(express.json());".


-Crear en app.js métodos GET y POST para hacer peticiones a fakestoreapi.com:


// GET
app.get('/products/:id?', async (req, res) => {
  if (req.params.id) {
    try {
      let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); // {object}
      let products = await response.json(); // {object}
      res.render('products', { 'products': [products] }); // Pinta datos en PUG
    }
    catch (error) {
      console.log(`ERROR: ${error.stack}`);
    }
  } else {
    try {
      let response = await fetch(`https://fakestoreapi.com/products`); // [array]
      let products = await response.json(); // [array]
      res.render('products', { products}); // Pinta datos en PUG
    }
    catch (error) {
      console.log(`ERROR: ${error.stack}`);
    }
  }
})



// POST
app.post('/products', async (req, res) => {
  console.log("Esto es el console.log de lo que introducimos por postman", req.body); // Objeto recibido de producto nuevo
  const newProduct = req.body; // {} nuevo producto a guardar

  // Líneas para guardar en una BBDD o MongoDB
  let response = await fetch('https://fakestoreapi.com/products', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
  })
  let answer = await response.json(); // objeto devuelto de la petición
  console.log("Este es el console.log de lo que devuelve la API", answer);

  res.send(`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`);
});




-PARA HACER UN GET:
->Se crea un template en views (products.pug) con el siguiente contenido:


doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(http-equiv="X-UA-Compatible", content="IE=edge")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Document
    body 
        each product in products
            h1 Sección productos 
            p Título: #{product.title}
            p Descripción: #{product.description}
            p Precio: #{product.price}
            img(src=product.image, alt=product.title width="300")


-En POSTMAN se introduce la dirección "http://localhost:3000/products". Devuelve un array de objetos correspondientes con los productos de la URL. Si se introduce "http://localhost:3000/products/número" devolvería el objeto especificado.




-PARA HACER UN POST:

->No se puede postear desde el navegador, a no ser que se tenga algún formulario renderizado para recoger los datos. Entonces, desde POSTMAN se selecciona la opción POST > Body > raw > tipo JSON, se copia uno de los objetos de fakestoreapi para tener la estructura, se pega en el textarea de POSTMAN y se sustituyen los datos por los que se quieran. Se introduce la dirección "http://localhost:3000/products"


















      //// MVC: MODELO-VISTA-CONTROLADOR ////


-El término Modelo-vista-controlador (carpetas models, views, controllers) es el patrón más común para desarrollo web en el servidor Express. Separa el código en rutas, controladores, modelos...

-Se crean las carpetas routes, controllers, models


ROUTES: Contiene todas las rutas de nuestra aplicación

CONTROLLERS: Contiene los archivos de los controladores

MODELS: Contiene todo el código de las bases de datos









   // CONTROLADOR //


-En "controllers" se crea un archivo "productsController.js", que es donde irán cada una de las funciones (la lógica de negocio) asociadas a cada ruta. Este es el encargado de hacer las peticiones a la base de datos.

-A continuación, se externalizarán funciones que teníamos creadas en "app.js". En "productsController.js" se importa node-fetch, se escribe la estructura del objeto para guardar las funciones callback y se exporta el módulo:


const fetch = require('node-fetch');

const products = {

    getProducts: async (req, res) => {
        if (req.params.id) {
          try {
            let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); // {object}
            let products = await response.json(); // {object}
            res.render('products', { 'products': [products] }); // Pinta datos en PUG
          }
          catch (error) {
            console.log(`ERROR: ${error.stack}`);
          }
        } else {
          try {
            let response = await fetch(`https://fakestoreapi.com/products`); // [array]
            let products = await response.json(); // [array]
            res.render('products', { products}); // Pinta datos en PUG
          }
          catch (error) {
            console.log(`ERROR: ${error.stack}`);
          }
        }
      },

    createProduct: async (req, res) => {
        console.log("Esto es el console.log de lo que introducimos por postman", req.body); // Objeto recibido de producto nuevo
        const newProduct = req.body; // {} nuevo producto a guardar
      
        // Líneas para guardar en una BBDD o MongoDB
        let response = await fetch('https://fakestoreapi.com/products', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProduct)
        })
        let answer = await response.json(); // objeto devuelto de la petición
        console.log("Este es el console.log de lo que devuelve la API", answer);
      
        res.send(`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`);
      }
};

module.exports = products;





-SIN EMBARGO, nosotros vamos a trabajar con el patrón de diseño estructural [FACADE]:

-En FACADE, las funciones se definene como variables (en lugar de definirlas como métodos del objeto products) y la exportación se realiza en un objeto, llamando a las funciones como propiedades. Esto tiene la ventaja de que se puede visualizar en "module.exports" claramente lo que se está exportando, o comentarlo... Al final la dos formas devuelven un objeto.


const fetch = require('node-fetch');

const getProducts = async (req, res) => {
    if (req.params.id) {
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); // {object}
            let products = await response.json(); // {object}
            res.status(200).render('products', { 'products': [products] }); // Pinta datos en PUG
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).render('products', { 'products': [] }); // Pinta datos en PUG
        }
    } else {
        try {
            let response = await fetch(`https://fakestoreapi.com/products`); // [array]
            let products = await response.json(); // [array]
            res.status(200).render('products', { products }); // Pinta datos en PUG
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).render('products', { products: [] }); // Pinta datos en PUG
        }
    }
};


const createProduct = async (req, res) => {
    console.log("Esto es el console.log de lo que introducimos por postman", req.body); // Objeto recibido de producto nuevo
    const newProduct = req.body; // {} nuevo producto a guardar

    // Líneas para guardar en una BBDD o MongoDB
    try {
        let response = await fetch('https://fakestoreapi.com/products', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        let answer = await response.json(); // objeto devuelto de la petición
        console.log("Este es el console.log de lo que devuelve la API", answer);
        res.status(201).send(`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`);

    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).send(`Error guardando producto ${answer.title}`);
    }

};


const deleteProduct = async (req, res) => {
    const msj = "Has enviado un DELETE para borrar product";
    console.log(msj);
    res.send(msj);
};


module.exports = {
    getProducts,
    //createProduct,
    //deleteProduct
};












   // ROUTES //


-En la carpeta "routes" se crea el archivo "productsRoutes.js":

   -Importamos Express: const express = require('express');

   -Importamos el controlador: const productsController = require("../controllers/productsController")

   -Declaramos el router: const productsRouter = express.Router();


-Se escribe la ruta GET, POST y DELETE:

// GET: http://localhost:3000/products
productsRouter.get('/:id?', productsController.getProducts);

// POST: http://localhost:3000/products --> INECESARIA
productsRouter.post('/', checkApiKey, productsController.createProduct);

// DELETE: http://localhost:3000/products --> INECESARIA
productsRouter.delete("/", checkApiKey, productsController.deleteProduct);

-Se exporta el router: module.exports = productsRouter;


-En app.js hay inicializar las rutas, entonces se escribe:

   -Importar las rutas de productos: const productsRoutes = require("./routes/productsRoutes");

   // Inicialización de las rutas de productos: WEB
   app.use("/products", productsRoutes);
   //Con middleware de acceso para TODAS las rutas "/products" sería:
   //app.use("/products", checkApiKey, productsRoutes);










   // MIDDLEWARE //


-Es una operación intermedia que hace comprobaciones (capas de funciones middleware que hay que ir superando), como por ejemplo, saber si la ruta existe. Si esta no existe, hará lo que le indiquemos. Pero si existe, ejecutará la tarea principal.

-En "app.js" inicializamos un middleware por defecto para rutas no existentes (error404):

// Middleware de error 404
// Respuesta por defecto para rutas no existentes
app.use(manage404);

-Se coloca al final del todo, ya que funciona tal que si se introduce una ruta incorrecta, tras comprobar todas las rutas y no coincidir ninguna, ejecuta el middleware (que está en último lugar, antes de el listener del puerto)


-Se crea la carpeta "middlewares" y en ella, el archivo "error404.js".

-En "error404.js" se escribe la función middleware y se exporta:

const manage404 = function (req,res,next) {
   res.status(404).send('ERROR!! 404 not found :)');
};
module.exports = manage404;


-Se importa en "app.js" la función middleware como módulo interno:

// Importación de módulos internos
const manage404 = require('./middlewares/error404'); // Middleware


-Otros usos de los Middlewares:
   -Auth Middleware: Autenticación (si manda APIKEY o no...)
   -CORS Middleware: Comprueba desde qué IP estás haciendo la petición (se puede restringir a peticiones solo de IP conocidas)
   -...












    // CREACIÓN DE API//


-Hasta ahora, solo hemos hecho rutas que devuelven vistas. A continuación haremos rutas que devuelvan objetos (como la Pokeapi).



-Se crea productsApiRoutes.js en routes:

const express = require('express');  //Importación de Express

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

//Exportación del router
module.exports = productsApiRouter;



-Se importa en app.js las rutas de Api products:

// Rutas de productos
const productsApiRoutes = require("./routes/productsApiRoutes");





-Se crea productsApiController.js en controllers:


const fetch = require('node-fetch');

// Facade: Tipo de patrón de diseño estructural

const getProducts = async (req, res) => {
    if (req.params.id) {
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); // {object}
            let product = await response.json(); // {object}
            res.status(200).json(product); // Devuelve JSON
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json({ 'Error':'Producto no encontrado' }); // Devuelve JSON
        }
    } else {
        try {
            let response = await fetch(`https://fakestoreapi.com/products`); // [array]
            let products = await response.json(); // [array]
            res.status(200).json({ products }); // Devuelve JSON
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json({ 'Error':'Productos no encontrados' }); // Devuelve JSON
        }
    }
};

const createProduct = async (req, res) => {
    console.log("Esto es el console.log de lo que introducimos por postman", req.body); // Objeto recibido de producto nuevo
    const newProduct = req.body; // {} nuevo producto a guardar

    // Líneas para guardar en una BBDD o MongoDB
    try {
        let response = await fetch('https://fakestoreapi.com/products', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        let answer = await response.json(); // objeto devuelto de la petición
        console.log("Este es el console.log de lo que devuelve la API", answer);
        res.status(201).json({"message":`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`});

    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({"message":`Error guardando producto ${answer.title}`});
    }

};

const deleteProduct = async (req, res) => {
    const msj = "Has enviado un DELETE para borrar product";
    console.log(msj);
    res.json({"message":msj});
};

module.exports = {
    getProducts,
    createProduct,
    deleteProduct
};





-Si nos fijamos, hemos sustituído el método ".render" por ".json", y en el primer parámetro ('products'), que era el PUG, lo hemos eliminado. Así lo haremos con todas las funciones de Api.

-También se han modificado la estructura del objeto devuelto en las funciones, para que lo devuelva más simple (sin estar encerrado en array de objetos...)



-Se inicializa la ruta en app.js:

// Inicialización de las rutas (Router) de productos: API
app.use("/api/products", productsApiRoutes);
