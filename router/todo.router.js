const router = require('express').Router();
const authorization = require('../middlewares/authorization.mid');
const isTodoInDatabase = require('../middlewares/isTodoInDatabase');
const isListInDatabase = require('../middlewares/isListInDatabase.mid');
const {
    getTodoList,
    getTodo,
    insertTodo,
    updateTodo,
    deleteTodo,
} = require('../controllers/todo.controller');

router.get(
    '/:todoId',
    authorization,
    isTodoInDatabase,
    isListInDatabase,
    async (req, res, next) => {
        // TODO: REVOIR LES MIDDLEWARES
        try {
            await getTodo(req, res);
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
            await getTodoList(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/', authorization, async (req, res, next) => {
    try {
        await insertTodo(req, res, next);
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
            await updateTodo(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);
// TODO: Ajouter un middleware pour la vérification de l'utilisateur
router.delete(
    '/:todoId',
    authorization,
    isTodoInDatabase,
    isListInDatabase,
    async (req, res, next) => {
        try {
            await deleteTodo(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);
