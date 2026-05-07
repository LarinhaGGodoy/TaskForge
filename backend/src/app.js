console.log('APP ATUALIZADO');

require('./database/database');

const express = require('express');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(taskRoutes);

app.get('/teste', (req, res) => {
  res.send('rota teste funcionando');
}); 

app.get('/', (req, res) => {
  res.json({ mensagem: 'API TaskForge rodando' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});