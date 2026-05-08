const mysql = require('mysql2/promise');

const connection = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: 'examen2026',
    database: 'localsmart'
});

console.log('Conectado correctamente a la base de datos!');

module.exports = connection;