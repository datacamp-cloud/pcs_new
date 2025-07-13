const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const path = require('path');

const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes); 
app.use('/api/user', userRoutes);
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('🚀 API PCS en ligne');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connecté"))
  .catch(err => console.log("Erreur MongoDB :", err));

const PORT = process.env.PORT || 10000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => console.log(`Serveur lancé sur le port ${PORT}`));
}

module.exports = app;  
