const taskModel = require('../models/taskModel');

const createTask = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: 'O nome da tarefa é obrigatório'
    });
  }

  taskModel.createTask(name, (err, task) => {
    if (err) {
      return res.status(500).json({
        error: 'Erro ao cadastrar tarefa'
      });
    }

    res.status(201).json(task);
  });
};

const getAllTasks = (req, res) => {
  taskModel.getAllTasks((err, tasks) => {
    if (err) {
      return res.status(500).json({
        error: 'Erro ao buscar tarefas'
      });
    }

    res.status(200).json(tasks);
  });
};

const deleteTask = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: 'ID inválido'
    });
  }

  taskModel.deleteTask(id, (err) => {
    if (err) {
      if (err.message === 'NotFound') {
        return res.status(404).json({
          error: 'Tarefa não encontrada'
        });
      }

      return res.status(500).json({
        error: 'Erro ao excluir tarefa'
      });
    }

    res.status(204).send();
  });
};

module.exports = {
  createTask,
  getAllTasks,
  deleteTask
};