const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('tasks.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    return;
  }
  console.log('Conectado ao banco de dados SQLite.');
});

db.run(
  `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`
);

module.exports = db;
