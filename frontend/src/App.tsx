import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
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
      await axios.post('http://localhost:3000/tasks', {
        name: `${taskName} • ${taskDate}`
      });

      setTaskName('');
      setTaskDate('');
      fetchTasks();
    } catch (error) {
      console.error('Erro ao cadastrar tarefa');
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Erro ao excluir tarefa');
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="top">
          <div>
            <h1>TaskForge ✨</h1>
            <p>{today}</p>
          </div>

          <div className="mini-card">
            <span>{tasks.length}</span>
            <p>Tarefas</p>
          </div>
        </div>

        <div className="home-card">
          <h2>Organize sua mente 🌸</h2>
          <p>
            Planeje seu dia de forma leve, simples e bonita.
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
