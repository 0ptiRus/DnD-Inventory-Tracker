const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const characterRoutes = require('./routes/character');
require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
