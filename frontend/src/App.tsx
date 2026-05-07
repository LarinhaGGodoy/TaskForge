import { useEffect, useState } from 'react';
import './App.css';
import { createTask, deleteTask as deleteTaskService, getTasks } from './services/tasksService';
import type { Task } from './services/tasksService';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName) return;

    try {
      await createTask(`${taskName} • ${taskDate}`);
      setTaskName('');
      setTaskDate('');
      fetchTasks();
    } catch (error) {
      console.error('Erro ao cadastrar tarefa');
    }
  };

  const deleteTask = async (id: number | undefined) => {
    if (typeof id !== 'number') {
      console.error('ID inválido para exclusão:', id);
      return;
    }

    try {
      await deleteTaskService(id);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa', error);
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="top">
          <div>
            <h1>TaskForge</h1>
            <p>{today}</p>
          </div>

          <div className="mini-card">
            <span>{tasks.length}</span>
            <p>Tarefas</p>
          </div>
        </div>

        <div className="home-card">
          <h2> Visão clara do seu dia. </h2>
          <p>
           Estruture seu dia, acompanhe suas atividades e mantenha sua rotina sob controle.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Digite uma tarefa"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />

          <button type="submit">
            Adicionar
          </button>

        </form>

        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                padding: '10px 12px',
                borderRadius: '8px',
                background: '#fff',
                marginBottom: '10px'
              }}
            >
              <span>{task.name}</span>
              <button
                type="button"
                onClick={() => deleteTask(task.id)}
                style={{
                  backgroundColor: '#e74c3c',
                  border: 'none',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;
