const List = require('../models/list.model');
const Todo = require('../models/todo.model');

const isListInDatabase = async (req, res, next) => {
    try {
        const getListById = await List.findById(req.params.listId);
        if (!getListById && req.todo !== undefined) {
            await Todo.deleteMany({ listId: req.params.listId }); // Si jamais (mais ça ne devrait pas arriver), on retrouve des orphelins dans la bdd, on les supprime
        }
        if (!getListById) {
            return res.status(404).json({ message: 'List not found' });
        }
        if (getListById.userId.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = isListInDatabase;
