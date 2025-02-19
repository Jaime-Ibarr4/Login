const express = require('express');
const app = express();
const path = require('path');
const productosController = require('./CONTROLLERS/productos.controllers'); 
const registroController = require('./CONTROLLERS/registro.controllers'); 

app.use('/css', express.static(path.join(__dirname, 'css')));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'VIEW/login.html')); 
});

// conecta el css con el login
app.use('/css', express.static(path.join(__dirname, 'CSS')));
app.use('/img', express.static(path.join(__dirname, 'IMG')));
// Ruta para obtener todos los productos
app.get('/productos/all', productosController.getAllProducts);

// Ruta para los registros
app.get('/registro/all', registroController.getAllRegistrations);

//puesto en el cual corre el programa
app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3000");
});