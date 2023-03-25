const router = require('express').Router();
const authorization = require('../middlewares/authorization.mid');
const isTodoInDatabase = require('../middlewares/isTodoInDatabase');
const isListInDatabase = require('../middlewares/isListInDatabase.mid');
const todoController = require('../controllers/todo.controller');

router.get(
    '/unique/:todoId',
    authorization,
    isTodoInDatabase,
    isListInDatabase,
    async (req, res, next) => {
        try {
            await todoController.getTodo(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/:listId',
    authorization,
    isListInDatabase,
    async (req, res, next) => {
        try {
            await todoController.getTodoList(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/', authorization, async (req, res, next) => {
    try {
        await todoController.insertTodo(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.patch(
    '/:todoId',
    authorization,
    isTodoInDatabase,
    isListInDatabase,
    async (req, res, next) => {
        try {
            await todoController.updateTodo(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

router.delete(
    '/:todoId',
    authorization,
    isTodoInDatabase,
    isListInDatabase,
    async (req, res, next) => {
        try {
            await todoController.deleteTodo(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
