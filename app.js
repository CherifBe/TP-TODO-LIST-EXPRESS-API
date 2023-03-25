const express = require('express');
require('dotenv').config();
require('./database');
const cors = require('cors');
const authRouter = require('./router/auth.router');
const listRouter = require('./router/list.router');
const todoRouter = require('./router/todo.router');

const { PORT } = process.env || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/list', listRouter);
app.use('/todo', todoRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ status: 'error', message: err });
});

app.use((req, res) => {
    res.status(404).json({ message: 'not found: check the url !' });
});

app.listen(PORT, () => {
    console.log(`=> server lauched on port : ${PORT}`);
});
