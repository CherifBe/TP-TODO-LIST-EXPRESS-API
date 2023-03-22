const express = require('express');
require('dotenv').config();
require('./database');

const { PORT } = process.env || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth');
app.use('/list');
app.use('/todo');

app.use((err, req, res) => {
    res.status(500).json({ status: 'error', message: err });
});

app.use((req, res) => {
    res.status(404).json({ message: 'not found: check the url !' });
});

app.listen(PORT, () => {
    console.log(`=> server lauched on port : ${PORT}`);
});
