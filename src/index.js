const express = require('express');
const app = express();
const path = require('path');
const productosController = require('./controllers/productos.controllers'); 
const registroController = require('./routes/registro.routes'); 
const baseController = require('./controllers/base.controllers'); // Importar el controlador
const port = 3001;

app.use(express.json()); // Middleware para parsear JSON

app.use('/css', express.static(path.join(__dirname, 'css')));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view/login.html')); 
});

// conecta el css con el login
app.use('/css', express.static(path.join(__dirname, 'css')));

app.use('/img', express.static(path.join(__dirname, 'img')));

// Ruta para obtener todos los productos
app.get('/productos/all', productosController.getAllProducts);

// Ruta para los registros
app.use('/registro', registroController);

// Nueva ruta para obtener datos de la base de datos
app.get('/basededatos', baseController.getDatabaseData);

// Nueva ruta para insertar datos en la base de datos
app.post('/basededatos', baseController.insertUserData);

// puesto en el cual corre el programa
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
