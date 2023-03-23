const Todo = require('../models/todo.model');
const List = require('../models/list.model');

export async function getTodo(req, res) {
    const getTodoById = await Todo.findById(req.params.todoId);
    res.status(200).json(getTodoById);
}

export async function getTodoList(req, res) {
    const getTodoListByListId = await Todo.find({ listId: req.params.listId });
    res.status(200).json(getTodoListByListId);
}

export async function insertTodo(req, res) {
    const todoFromRequest = req.body;
    const toModelKeys = ['listId', 'title', 'content', 'paragraphe'];
    const isEveryKeyInRequest = Object.keys(todoFromRequest).every((key) =>
        toModelKeys.includes(key)
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
    if (getListById.userId !== req.user.userId) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    const ans = await Todo.create(todoFromRequest);
    res.status(201).json(ans);
}

export async function updateTodo(req, res) {
    const todoFromRequest = req.body; // TODO: Faire fichier service pour éviter de répéter le code
    const toModelKeys = ['listId', 'title', 'content', 'paragraphe'];
    const isEveryKeyInRequest = Object.keys(todoFromRequest).every((key) =>
        toModelKeys.includes(key)
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
}

export async function deleteTodo(req, res) {
    await Todo.findByIdAndDelete(req.params.todoId);
    return res.status(202).json({ message: 'todo deleted !' });
}
