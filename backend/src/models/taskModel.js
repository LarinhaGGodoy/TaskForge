const db = require('../database/database');

const createTask = (name, callback) => {
  const query = 'INSERT INTO tasks (name) VALUES (?)';

  db.run(query, [name], function (err) {
    if (err) {
      return callback(err);
    }

    callback(null, {
      id: this.lastID,
      name
    });
  });
};

const getAllTasks = (callback) => {
  const query = 'SELECT * FROM tasks';

  db.all(query, [], (err, rows) => {
    if (err) {
      return callback(err);
    }

    callback(null, rows);
  });
};

module.exports = {
  createTask,
  getAllTasks
};