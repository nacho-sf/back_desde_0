const fetch = require('node-fetch'); //Importación de Fetch


// Controlador buscar/leer productos
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


// Controlador crear producto
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


// Controlador borrar producto
const deleteProduct = async (req, res) => {
    const msj = "Has enviado un DELETE para borrar product";
    console.log(msj);
    res.send(msj);
};


// Exportación de las funciones/controladores
module.exports = {
    getProducts,
    //createProduct,
    //deleteProduct
};
