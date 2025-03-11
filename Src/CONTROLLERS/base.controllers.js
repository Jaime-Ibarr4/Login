const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ivelazquez', // Reemplaza con tu contraseña de MySQL
  database: 'LoginSystem'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

const getDatabaseData = (req, res) => {
  const query = 'SELECT * FROM Users';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

const insertUserData = (req, res) => {
  const { username, password } = req.body;
  const checkQuery = 'SELECT * FROM Users WHERE username = ?';
  connection.query(checkQuery, [username], (err, results) => {
    if (err) {
      console.error('Error checking username:', err);
      return res.status(500).send(err);
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const insertQuery = 'INSERT INTO Users (username, password) VALUES (?, ?)';
    connection.query(insertQuery, [username, password], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send(err);
      }
      res.json({ message: 'User data inserted successfully', results });
    });
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).send(err);
    }
    if (results.length > 0) {
      res.send('Login successful');
    } else {
      res.send('Invalid username or password');
    }
  });
};

module.exports = {
  getDatabaseData,
  insertUserData,
  loginUser
};