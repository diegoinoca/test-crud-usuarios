const mysql = require("mysql");
// Create a connection to the database

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DB || 'backend',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
});

module.exports = connection;
