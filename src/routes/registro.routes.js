const express = require('express');
const router = express.Router();

// Define tus rutas aquí
router.get('/', (req, res) => {
  res.send('Página de registro');
});

module.exports = router;