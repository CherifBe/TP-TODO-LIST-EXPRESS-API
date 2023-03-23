const Todo = require('../models/todo.model');

const isTodoInDatabase = async (req, res, next) => {
    try {
        const getTodoById = await Todo.findById(req.params.todoId);
        if (!getTodoById) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        req.params.listId = getTodoById.listId;
        req.todo = getTodoById;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = isTodoInDatabase;
