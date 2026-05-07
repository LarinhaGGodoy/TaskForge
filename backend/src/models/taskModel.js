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

const deleteTask = (id, callback) => {
  const query = 'DELETE FROM tasks WHERE id = ?';

  db.run(query, [id], function (err) {
    if (err) {
      return callback(err);
    }

    if (this.changes === 0) {
      return callback(new Error('NotFound'));
    }

    callback(null);
  });
};

module.exports = {
  createTask,
  getAllTasks,
  deleteTask
};