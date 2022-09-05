const express = require("express");

// Rutas de entries:
const entriesApiController = require("../controllers/entriesApiController");
const entriesApiRoutes = express.Router();

//entriesApiRouter.get("/", entriesApiController.getEntries);
entriesApiRoutes.post("/", entriesApiController.createAuthor);
//entriesApiRoutes.post("/", entriesApiController.createEntry);
entriesApiRoutes.put("/", entriesApiController.updateEntry);
entriesApiRoutes.delete("/", entriesApiController.deleteEntry);
entriesApiRoutes.get("/", entriesApiController.getAuthors);


module.exports = entriesApiRoutes;

// Endpoints:
// GET http://localhost:3000/entries -> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com -> Por email
// POST http://localhost:3000/entries