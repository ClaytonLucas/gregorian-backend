const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index');
const Music = require('./models/music');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/musicas', require('./routes/musicRoutes'));

// Inicializa banco
sequelize.sync();

module.exports = app;
