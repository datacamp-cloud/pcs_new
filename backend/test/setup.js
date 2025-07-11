// test/setup.js
const mongoose = require('mongoose');

beforeAll(async () => {
  const url = 'mongodb://localhost:27017/pcs_xpress';  // Remplace par l'URL de ta base de données de test
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();  // Ferme la connexion à la base de données après les tests
});
