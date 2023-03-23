const Todo = require('../models/todo.model');
const List = require('../models/list.model');

const getTodo = async (req, res) => {
    const getTodoById = await Todo.findById(req.params.todoId);
    res.status(200).json(getTodoById);
};

const getTodoList = async (req, res) => {
    const getTodoListByListId = await Todo.find({ listId: req.params.listId });
    res.status(200).json(getTodoListByListId);
};

const insertTodo = async (req, res) => {
    const todoFromRequest = req.body;
    const todoModelKeys = ['listId', 'title', 'content', 'paragraph'];
    const isEveryKeyInRequest = Object.keys(todoFromRequest).every((key) =>
        todoModelKeys.includes(key)
    );
    if (!isEveryKeyInRequest) {
        return res.status(422).json({
            message: "Keys didn't correspond",
        });
    }
    const getListById = await List.findById(todoFromRequest.listId);
    if (!getListById) {
        return res.status(404).json({ message: 'List not found' });
    }
    if (getListById.userId.toString() !== req.user.userId) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    const ans = await Todo.create(todoFromRequest);
    res.status(201).json(ans);
};

const updateTodo = async (req, res) => {
    const todoFromRequest = req.body; // TODO: Faire fichier service pour éviter de répéter le code
    const todoModelKeys = ['listId', 'title', 'content', 'paragraph'];
    const isEveryKeyInRequest = Object.keys(todoFromRequest).every((key) =>
        todoModelKeys.includes(key)
    );
    if (!isEveryKeyInRequest) {
        return res.status(422).json({
            message: "Keys didn't correspond",
        });
    }
    const ans = await Todo.findByIdAndUpdate(req.params.todoId, req.body, {
        new: true,
    });
    res.status(200).json({
        message: 'todo updated !',
        updateTodo: ans,
    });
};

const deleteTodo = async (req, res) => {
    await Todo.findByIdAndDelete(req.params.todoId);
    return res.status(202).json({ message: 'todo deleted !' });
};

module.exports.getTodo = getTodo;
module.exports.getTodoList = getTodoList;
module.exports.insertTodo = insertTodo;
module.exports.updateTodo = updateTodo;
module.exports.deleteTodo = deleteTodo;
