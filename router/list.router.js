const router = require('express').Router();
const listController = require('../controllers/list.controller');
const authorization = require('../middlewares/authorization.mid');
const isListInDatabase = require('../middlewares/isListInDatabase.mid');

router.get('/', authorization, async (req, res, next) => {
    try {
        await listController.getLists(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.post('/', authorization, async (req, res, next) => {
    try {
        await listController.insertList(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.patch(
    '/:listId',
    authorization,
    isListInDatabase,
    async (req, res, next) => {
        try {
            await listController.updateList(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

router.delete(
    '/:listId',
    authorization,
    isListInDatabase,
    async (req, res, next) => {
        try {
            await listController.deleteList(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
