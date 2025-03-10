const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ivelazquez', // Reemplaza con tu contraseña de MySQL
  database: 'Usuarios'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

const getDatabaseData = (req, res) => {
  const query = 'SELECT * FROM Usuarios';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

const insertUserData = (req, res) => {
  const { ID_Usuario, Nombre } = req.body;
  const query = 'INSERT INTO Usuarios (ID_Usuario, Nombre) VALUES (?, ?)';
  connection.query(query, [ID_Usuario, Nombre], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send(err);
    }
    res.json({ message: 'User data inserted successfully', results });
  });
};

module.exports = {
  getDatabaseData,
  insertUserData
};