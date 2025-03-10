const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

const productosController = require('./CONTROLLERS/productos.controllers'); 
const registroController = require('./ROUTES/registro.routes'); 
const baseController = require('./CONTROLLERS/base.controllers'); // Importar el controlador

app.use(express.json()); // Middleware para parsear JSON

// Servir archivos estáticos desde la carpeta 'Src/CSS' y 'Src/IMG'
app.use('/css', express.static(path.join(__dirname, 'CSS')));
app.use('/img', express.static(path.join(__dirname, 'IMG')));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'VIEW/login.html')); 
});

// Ruta para insertar datos en la base de datos
app.get('/insertUser', (req, res) => {
  res.sendFile(path.join(__dirname, 'VIEW/insertUser.html'));
});

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